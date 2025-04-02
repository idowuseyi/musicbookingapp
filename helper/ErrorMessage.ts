export const Errormessage = {
  UserExist: {
    success: false,
    apiErrorCode: '403',
    message: 'User already exist',
  },

  IncorrectEmail: {
    success: false,
    apiErrorCode: '401',
    message: 'Email is not a valid type',
  },

  Unmatchpassword: {
    success: false,
    apiErrorCode: '401',
    message: 'Password does not match',
  },

  UserNotFound: {
    success: false,
    apiErrorCode: '401',
    message: 'User not found',
  },
};
