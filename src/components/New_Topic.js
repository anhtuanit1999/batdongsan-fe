import React, { Component, useEffect, useState } from "react";
import data1 from "../SIMULATION_DATABASE/data_BlockNews.json";
import data2 from "../SIMULATION_DATABASE/data_NewsQuickView.json";
import data3 from "../SIMULATION_DATABASE/data_NewsFullView.json";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";

import {
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Upload,
  message,
  Space,
} from "antd";
import { useDispatch } from "react-redux";
import { postNew } from "../actions/postActions";
import api from "../api";
const { Option } = Select;
const { Dragger } = Upload;

function New_Topic() {
  const dispatch = useDispatch();

  //img
  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  //address
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  //Type
  const [type, setType] = useState("");
  const [direction, setDirection] = useState("");
  const [legalDocuments, setLegalDocuments] = useState("");

  //Input data
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    acreage: "",
  });

  const [utilities, setUtilities] = useState([]);
  //func get data from form
  function handleChangeType(value) {
    setType(value);
  }
  function handleChangeLegalDocuments(value) {
    setLegalDocuments(value);
  }
  function handleChangeDiretion(value) {
    setDirection(value);
  }

  //handle change
  const handleChangedInput = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  //func call api address

  function GetCitys() {
    axios
      .get("https://provinces.open-api.vn/api/")
      .then((res) => {
        setCitys(res.data);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  function GetDistricts(code) {
    axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((res) => {
        setDistricts(res.data.districts);
        setCity(res.data.name);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  function GetWards(code) {
    axios
      .get(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
      .then((res) => {
        setWards(res.data.wards);
        setDistrict(res.data.name);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  }

  useEffect(() => {
    GetCitys();
  }, []);

  //send
  const handleCreate = (e) => {
    e.preventDefault();
    console.log(productForm, "test1");
    console.log(legalDocuments, "legal");
    console.log(type, "type");
    console.log(direction, "direction");
    dispatch(
      postNew(
        productForm,
        type,
        legalDocuments,
        direction,
        city,
        district,
        ward
      )
    );
  };
  //reset form
  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      acreage: "",
    });
    setCity("");
    setDistrict("");
    setWard("");
  };
  const handleImg = (e) => {
    axios
      .post(`/${api}/firebase/uploadmulti`)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        message.error({
          content: error,
          duration: 2,
        });
      });
  };
  return (
    <div>
      <h2 className="mt-5 pt-5">Share your news with us</h2>
      <form className="container">
        <div className="form-groups sm-12">
          <label>
            <h4>Name:</h4>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name here"
            value={productForm.name}
            onChange={handleChangedInput}
          />
        </div>
        <div class="form-group sm-12">
          <label>
            <h4>Type:</h4>
          </label>
          <Select
            onChange={handleChangeType}
            defaultValue="Bán"
            style={{ width: "100%" }}
          >
            <Option value="Bán">Bán</Option>
            <Option value="Cho thuê">Cho thuê</Option>
          </Select>
        </div>
        <div className="form-groups sm-12">
          <label>
            <h4>Description:</h4>
          </label>
          <textarea
            class="form-control"
            name="description"
            rows="3"
            value={productForm.description}
            onChange={handleChangedInput}
          ></textarea>
        </div>
        <div className="form-groups sm-12">
          <label>
            <h4>Address:</h4>
          </label>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Chọn tỉnh/ Thành phố"
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.label
                .toLowerCase()
                .localeCompare(optionB.label.toLowerCase())
            }
            options={
              citys &&
              citys.map((value) => {
                return {
                  key: value.name,
                  label: value.name,
                  value: value.code,
                };
              })
            }
            onChange={(value) => {
              GetDistricts(value);
            }}
          />
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Chọn quận/ huyện"
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.label
                .toLowerCase()
                .localeCompare(optionB.label.toLowerCase())
            }
            options={
              districts &&
              districts.map((value) => {
                return {
                  key: value.name,
                  label: value.name,
                  value: value.code,
                };
              })
            }
            onChange={(value) => GetWards(value)}
          />
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Chọn phường/ xã"
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.label
                .toLowerCase()
                .localeCompare(optionB.label.toLowerCase())
            }
            options={
              wards &&
              wards.map((value) => {
                return {
                  key: value.name,
                  label: value.name,
                  value: value.name,
                };
              })
            }
            onChange={(value) => setWard(value)}
          />
        </div>
        <div className="form-groups sm-12">
          <label>
            <h4>specific address :</h4>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập địa chỉ nhà"
            value={address}
            onChange={(value) => setAddress(value.target.value)}
          />
        </div>

        <div className="form-groups sm-12">
          <label>
            <h4>address received :</h4>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập địa chỉ nhà"
            value={`${address ? address + " ," : ""}${ward ? ward + " ," : ""}${
              district ? district + " ," : ""
            }${city}`}
          />
        </div>
        <div className="form-groups sm-12">
          <label>
            <h4>acreage:</h4>
          </label>
          <input
            type="text"
            className="form-control"
            name="acreage"
            placeholder="Diện tích"
            value={productForm.acreage}
            onChange={handleChangedInput}
          />
        </div>
        <div className="form-groups sm-12">
          <label>
            <h4>Price:</h4>
          </label>
          <input
            type="text"
            className="form-control"
            name="price"
            placeholder="Giá"
            value={productForm.price}
            onChange={handleChangedInput}
          />
        </div>
        <div>
          <h6>Giấy Tờ Pháp Lí</h6>

          <Select
            onChange={handleChangeLegalDocuments}
            defaultValue="Giấy Tờ Pháp Lí"
            style={{ width: "100%" }}
          >
            <Option value="Sổ đỏ">Sổ đỏ</Option>
            <Option value="Hợp đồng mua bán">Hợp đồng mua bán</Option>
            <Option value="Đang chờ sổ">Đang chờ sổ</Option>
          </Select>
        </div>

        <div className="form-groups sm-12">
          <label>
            <h4>Direction:</h4>
          </label>
          <Select
            onChange={handleChangeDiretion}
            defaultValue="Hướng"
            style={{ width: "100%" }}
          >
            <Option value="Đông">Đông</Option>
            <Option value="Tây">Tây</Option>
            <Option value="Nam">Nam </Option>
            <Option value="Bắc">Bắc </Option>
            <Option value="Đông Bắc">Đông Bắc </Option>
            <Option value="Đông Nam">Đông Nam </Option>
            <Option value="Tây Nam ">Tây Nam </Option>
            <Option value="Tây Bắc">Tây Bắc </Option>
          </Select>
        </div>

        <div className="form-groups sm-12">
          <label>
            <h4>Image:</h4>
          </label>
          <input
            type="file"
            multiple
            className="form-control"
            onChange={handleImg}
          />
        </div>
        <div className="container justify-content-center text-center">
          <button
            style={{ "font-size": "30px" }}
            onClick={handleCreate}
            class="btn btn-primary my-5"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default New_Topic;
