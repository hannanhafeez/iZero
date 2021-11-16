import types from '../types';

const INITIAL_STATE = {
  data: [],
  createJobID: '',
  findTalent: [],
  findTalents: [],

  applicants: [],
  completed: [],
  favorite: [],
  live: [],
  talents: [],
  liveJobs: [],
  upComing: [],
  offered: [],

  overView: [],
  inProgress: [],
  completedFinance: [],
  expenses: [],
  savedQuotes: [],
  totalSpend: '',
  totalFee: '',
  loginUser: false,
  loginUserType: '',
  applied: [],
  liveBook: false,
  userIdMessage: '',
  searchJob: [],

  calendarList: {},

  calendarListAvailbility: {},
  shiftId: '',
  notificationTotal: '',
  availibility: {},
  talentSkills: [],
  jobDetails: {},
  staffExpenseDetails: {},
  employeerExpenseDetails: {},
  staffDetails: {},
  availibilityShow: {},
  jobSectors: [],
  jobFees: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.USER_DTA:
      return {
        ...state,
        data: [...action.data],
      };
    case types.REVERT_APP:
      return {
        ...state,
        data: [],
        createJobID: '',
        findTalent: [],
        findTalents: [],
        applicants: [],
        completed: [],
        favorite: [],
        live: [],
        talents: [],
        liveJobs: [],
        offered: [],

        overView: [],
        inProgress: [],
        completedFinance: [],
        expenses: [],
        savedQuotes: [],
        totalSpend: '',
        totalFee: '',
        upComing: [],
        loginUser: false,
        loginUserType: '',
        applied: [],
        liveBook: false,
        userIdMessage: '',
        searchJob: [],
        calendarList: {},
        calendarListAvailbility: {},
        shiftId: '',
        notificationTotal: '',
        availibility: {},
        talentSkills: [],
        jobDetails: {},
        staffExpenseDetails: {},
        employeerExpenseDetails: {},
        staffDetails: {},
        availibilityShow: {},
        jobSectors: [],
        jobFees: [],
      };

    case types.LOGIN_USER_STATUS:
      return {
        ...state,
        loginUser: action.loginUser,
        loginUserType: action.loginUserType,
      };

    case types.CREATE_JOB_ID:
      return {
        ...state,
        createJobID: action.createJobID,
      };

    case types.FIND_TALENT:
      return {
        ...state,
        findTalent: action.findTalent,
      };

    case types.FIND_TALENTS:
      return {
        ...state,
        findTalents: action.findTalents,
      };

    case types.APPLICANTS:
      return {
        ...state,
        applicants: action.applicants,
      };

    case types.COMPLETED:
      return {
        ...state,
        completed: action.completed,
      };

    case types.FAVOURITE:
      return {
        ...state,
        favorite: action.favorite,
      };

    case types.LIVE:
      return {
        ...state,
        live: action.live,
      };

    case types.TALENTS:
      return {
        ...state,
        talents: action.talents,
      };

    case types.LIVE_JOBS:
      return {
        ...state,
        liveJobs: action.liveJobs,
      };

    case types.OVER_VIEW:
      return {
        ...state,
        overView: action.overView,
      };

    case types.IN_PROGRESS:
      return {
        ...state,
        inProgress: action.inProgress,
      };

    case types.COMPLETED_FINANCE:
      return {
        ...state,
        completedFinance: action.completedFinance,
      };

    case types.EXPENSES:
      return {
        ...state,
        expenses: action.expenses,
      };

    case types.SAVED_QUOTES:
      return {
        ...state,
        savedQuotes: action.savedQuotes,
      };

    case types.TOTAL_SPEND:
      return {
        ...state,
        totalSpend: action.totalSpend,
      };

    case types.TOTAL_FEE:
      return {
        ...state,
        totalFee: action.totalFee,
      };

    case types.UP_COMINGS:
      return {
        ...state,
        upComing: action.upComing,
      };

    case types.APPLIED:
      return {
        ...state,
        applied: action.applied,
      };

    case types.LIVE_BOOK:
      return {
        ...state,
        liveBook: action.liveBook,
      };

    case types.OFFERED_JOBS:
      return {
        ...state,
        offered: action.offered,
      };

    case types.USER_ID_MESSAGES:
      return {
        ...state,
        userIdMessage: action.userIdMessage,
      };

    case types.SEARCH_JOB:
      return {
        ...state,
        searchJob: action.searchJob,
      };

    case types.CALENDAR_LIST:
      return {
        ...state,
        calendarList: action.calendarList,
      };

    case types.CALENDAR_LIST_AVAILBILITY:
      return {
        ...state,
        calendarListAvailbility: action.calendarListAvailbility,
      };

    case types.SHIFT_ID:
      return {
        ...state,
        shiftId: action.shiftId,
      };

    case types.NOTIFICATION_TOTAL:
      return {
        ...state,
        notificationTotal: action.notificationTotal,
      };

    case types.AVAILBILITY:
      return {
        ...state,
        availibility: action.availibility,
      };

    case types.TALENT_SKILLS:
      return {
        ...state,
        talentSkills: action.talentSkills,
      };

    case types.JOB_DETAILS:
      return {
        ...state,
        jobDetails: action.jobDetails,
      };

    case types.STAFF_EXPENSE_DETAILS:
      return {
        ...state,
        staffExpenseDetails: action.staffExpenseDetails,
      };

    case types.EMPLOYEER_EXPENSE_DETAILS:
      return {
        ...state,
        employeerExpenseDetails: action.employeerExpenseDetails,
      };

    case types.STAFF_DETAILS:
      return {
        ...state,
        staffDetails: action.staffDetails,
      };

    case types.AVAILBILITY_CALENDAR_SHOW:
      return {
        ...state,
        availibilityShow: action.availibilityShow,
      };

    case types.JOB_SECTORS:
      return {
        ...state,
        jobSectors: action.jobSectors,
      };

    case types.JOB_FEES:
      return {
        ...state,
        jobFees: action.jobFees,
      };

    default:
      return state;
  }
};
