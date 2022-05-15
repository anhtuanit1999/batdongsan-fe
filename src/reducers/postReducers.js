import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
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
export const listPostReducer = (
  state = { products: [], loading: true },
  action
) => {
  switch (action.type) {
    case POST_LIST_REQUEST:
      return { loading: true };
    case POST_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case POST_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
