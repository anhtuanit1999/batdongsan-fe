import {
  POST_NEW_FAIL,
  POST_NEW_REQUEST,
  POST_NEW_SUCCESS
} from "../constants/PostContants";

export const postNewsReducer = (
  state = { postproduct: {}, loading: true },
  action
) => {
  switch (action.type) {
    case POST_NEW_REQUEST:
      return { loading: true };
    case POST_NEW_SUCCESS:
      return { loading: false, postproduct: action.payload };
    case POST_NEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
