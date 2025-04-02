import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import {
  RegisterUserDto,
  UpdateUserDto,
  UserResponseDto,
} from './dtos/user.dto';
import { TokenPayload } from '../auth/token-payload.interface';
import { validateEmail, numberGenerator } from 'helper/helpers';
import { Errormessage } from 'helper/ErrorMessage';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    console.log('Registering user:', registerUserDto);

    const isValidEmail = validateEmail(registerUserDto.email);
    if (!isValidEmail) throw new NotFoundException(Errormessage.IncorrectEmail);

    try {
      const existingUser = await this.userRepository.findOneBy({
        email: registerUserDto.email,
      });

      if (!existingUser) {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
          registerUserDto.password,
          saltRounds,
        );

        const newUser = this.userRepository.create({
          ...registerUserDto,
          password: hashedPassword,
          otp: numberGenerator(),
          otpExpiration: new Date(Date.now()),
        });

        await this.userRepository.save(newUser);
        return {
          status: 201,
          message: 'User registered successfully',
          success: true,
          newUser,
        };
      } else {
        throw new BadRequestException(Errormessage.UserExist);
      }
    } catch (error) {
      console.error('Error in register method:', error);

      if (error.code === '42P01') {
        throw new InternalServerErrorException(
          'Database not properly set up. Run migrations.',
        );
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async getProfile(user: TokenPayload) {
    const foundUser = await this.userRepository.findOne({
      where: { id: user.userId },
    });
    if (!foundUser) throw new NotFoundException('User not found');

    return foundUser;
  }

  async getUser(filter: FindOptionsWhere<User>) {
    return this.userRepository.findOneBy(filter);
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return { id: user.id, email: user.email, role: user.role };
  }
}
