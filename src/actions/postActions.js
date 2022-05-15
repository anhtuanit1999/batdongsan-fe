import Axios from "axios";
import api from "../api";
import {
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_NEW_FAIL,
  POST_NEW_REQUEST,
  POST_NEW_SUCCESS,
} from "../constants/PostContants";

export const postNew =
  (newProduct, legal, directionHouse, city, district, ward, address, images) =>
    async (dispatch) => {
      dispatch({ type: POST_NEW_REQUEST });

      try {
        const token = localStorage.getItem('access_token');
        console.log(token);
        const { data } = await Axios.post(`${api}/news/create`, {
          newProduct,
          legal,
          directionHouse,
          city,
          district,
          address,
          ward,
          images
        }, { headers: { Authorization: "Bearer " + token, } });

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

export const listNews =
  () =>
    async (dispatch) => {
      dispatch({ type: POST_LIST_REQUEST });

      try {
        const formData = new FormData();
        formData.append('limit', 100);
        formData.append('offset', 0);
        const { data } = await Axios.post(`${api}/news/get-list-approve`, formData, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data'
          }
        })

        dispatch({ type: POST_LIST_SUCCESS, payload: data });

      } catch (error) {
        dispatch({
          type: POST_NEW_FAIL,
        });
        return { success: false, message: error.message };
      }
    };

