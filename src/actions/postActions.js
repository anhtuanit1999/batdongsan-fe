import Axios from "axios";
import api from "../api";
import {
  POST_NEW_FAIL,
  POST_NEW_REQUEST,
  POST_NEW_SUCCESS,
} from "../constants/PostContants";

export const postNew = (newProduct) => async (dispatch) => {
  dispatch({ type: POST_NEW_REQUEST });

  try {
    const { data } = await Axios.post(`${api}/news/create`, newProduct);

    if (data.success) {
      dispatch({ type: POST_NEW_SUCCESS, payload: data });
    } else {
      dispatch({ type: POST_NEW_FAIL });
      return { success: false, message: "Vui lòng kiểm tra thông tin" };
    }
    return data;
  } catch (error) {
    dispatch({
      type: POST_NEW_FAIL,
    });
    return { success: false, message: error.message };
  }
};
