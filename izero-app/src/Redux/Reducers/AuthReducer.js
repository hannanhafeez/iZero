import types from '../types';

const INITIAL_STATE = {
  user: {},
  accessToken: '',
  userSignUp: {
    user_title: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: '',
  },
  userType: '',
  deviceTocken: '',
  fcmTocken: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_TYPE:
      return {
        ...state,
        userType: action.userType,
      };
    case types.ADD_USER:
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken,
      };
    case types.SIGNUP_USER:
      return {
        ...state,
        userSignUp: action.userSignUp,
      };
    case types.DEVICE_TOCKEN:
      return {
        ...state,
        deviceTocken: action.deviceTocken,
      };
    case types.FCM_TOCKEN:
      return {
        ...state,
        fcmTocken: action.fcmTocken,
      };
    case types.REVERT_AUTH:
      return {
        user: {},
        accessToken: '',
        userSignUp: {
          user_title: '',
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
          type: '',
        },
        userType: '',
        deviceTocken: '',
        fcmTocken: '',
      };
    default:
      return state;
  }
};
