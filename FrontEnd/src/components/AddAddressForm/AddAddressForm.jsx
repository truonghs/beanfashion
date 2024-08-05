import axios from "axios";
import style from "./AddAddressForm.module.scss";
import className from "classnames/bind";
import { useQuery, useMutation, useQueryClient } from "react-query";
import React, { useState, useEffect, useContext, useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../config/axios";
import { Toast } from "primereact/toast";

const cx = className.bind(style);
const createAddress = async (address) => {
  const { data } = await axiosClient.post(`/user/address/add`, {
    address: address,
  });

  return data;
};
export default function AddAddressForm({ hiddenForm, setHiddenForm, status }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isFullFilled, setIsFullFilled] = useState(true);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState({
    name: "",
    phoneNumber: "",
    province: "",
    district: "",
    ward: "",
    detail: "",
  });
  const toast = useRef(null);

  // Connect react-query
  const queryClient = useQueryClient();
  useEffect(() => {
    axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then(({ data }) => {
        setProvinces(data.results);
      })
      .catch((error) => {
        console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
      });
  }, []);
  const changeProvince = (provineData) => {
    setProvince(provineData);
    setDistricts([]);
    setDistrict("");
    setWard("");
    setWards([]);
  };
  const fetchDistrict = () => {
    if (!province) {
      setDistricts([]);
      return;
    } else {
      const parsedProvince = JSON.parse(province);
      const id = parsedProvince.id;
      axios
        .get(`https://vapi.vnappmob.com/api/province/district/${id}`)
        .then(({ data }) => {
          setDistricts(data.results);
          setWard("");
          if (wards != []) {
            setWards([]);
          }
        })
        .catch((error) => {
          console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
        });
    }
  };

  const fetchWard = () => {
    if (!district) {
      setWards([]);
    } else {
      const parsedDistrict = JSON.parse(district);
      const id = parsedDistrict.id;
      axios
        .get(`https://vapi.vnappmob.com/api/province/ward/${id}`)
        .then(({ data }) => {
          setWards(data.results);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };
  const validateForm = () => {
    if (
      province === "" ||
      district === "" ||
      ward === "" ||
      address.name === "" ||
      address.phoneNumber === "" ||
      address.detail == ""
    ) {
      setIsFullFilled(false);
      return false;
    } else {
      setIsFullFilled(true);
      return true;
    }
  };
  const createAddressMutation = useMutation(createAddress, {
    onSuccess: (data) => {
    
      toast.current.show({
        severity: "success",
        summary: "Thông Báo",
        detail: "Thêm địa chỉ thành công!",
        life: 3000,
      });
      setHiddenForm(true);
      queryClient.invalidateQueries("addresses");
    },
    onError: (e) => {
      console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
    },
  });
  const handleSubmit = () => {
    if (validateForm()) {
      var addingObj = { ...address };
      addingObj.province = JSON.parse(province).name;
      addingObj.district = JSON.parse(district).name;
      addingObj.ward = ward;
      createAddressMutation.mutate(addingObj);
    }
  };
  return (
    <div className={cx("formCenter")}>
      <Toast ref={toast} />
      {!hiddenForm ? (
        <div className={cx("formContainer")}>
          <div className={cx("formFlex")}>
            <div className={cx("formHeading")}>
              <div className={cx("formTitleContainer")}>
                <div className={cx("formTitleTxt")}>Thêm địa chỉ mới</div>
                <div
                  onClick={(e) => setHiddenForm(true)}
                  className={cx("closeBtn")}
                >
                  <IoIosCloseCircleOutline size={24} />
                </div>
              </div>
              {!isFullFilled ? (
                <div className={cx("warningTxt")}>
                  Vui lòng nhập đầy đủ thông tin!
                </div>
              ) : null}
              <div className={cx("line")}></div>
            </div>
            <div className={cx("formBody")}>
              <div className={cx("formInputField")}>
                <div className={cx("formLabel")}>
                  Họ tên <span className={cx("require")}>*</span>{" "}
                </div>
                <input
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                  className={cx("formInput")}
                  placeholder=""
                ></input>
              </div>
              <div className={cx("formInputField")}>
                <div className={cx("formLabel")}>
                  Số điện thoại <span className={cx("require")}>*</span>
                </div>
                <input
                  onChange={(e) =>
                    setAddress({ ...address, phoneNumber: e.target.value })
                  }
                  className={cx("formInput")}
                  placeholder=""
                ></input>
              </div>
              <div className={cx("formSelectField")}>
                <div className={cx("formSelectFlex")}>
                  <div className={cx("formInputField", "selectInputField")}>
                    <div className={cx("formLabel")}>
                      Tỉnh thành <span className={cx("require")}>*</span>
                    </div>
                    <select
                      onChange={(e) => changeProvince(e.target.value)}
                      className={cx("formInput")}
                      placeholder=""
                    >
                      {provinces.map((province, index) => (
                        <option
                          key={index}
                          value={JSON.stringify({
                            id: province.province_id,
                            name: province.province_name,
                          })}
                          className={cx("option")}
                        >
                          {province.province_name}
                        </option>
                      ))}
                      <option
                        defaultChecked
                        value={""}
                        className={cx("option", "defaultOpt")}
                      >
                        --Chọn tỉnh thành--
                      </option>
                    </select>
                  </div>
                  <div className={cx("formInputField", "selectInputField")}>
                    <div className={cx("formLabel")}>
                      Quận huyện <span className={cx("require")}>*</span>
                    </div>
                    <select
                      onClick={(e) => fetchDistrict()}
                      onChange={(e) => setDistrict(e.target.value)}
                      className={cx("formInput")}
                      placeholder=""
                    >
                      {districts.map((district, index) => (
                        <option
                          key={index}
                          value={JSON.stringify({
                            id: district.district_id,
                            name: district.district_name,
                          })}
                          className={cx("option")}
                        >
                          {district.district_name}
                        </option>
                      ))}
                      <option
                        defaultChecked
                        value={""}
                        className={cx("option", "defaultOpt")}
                      >
                        --Chọn quận huyện--
                      </option>
                    </select>
                  </div>
                  <div className={cx("formInputField", "selectInputField")}>
                    <div className={cx("formLabel")}>
                      Phường xã <span className={cx("require")}>*</span>
                    </div>
                    <select
                      onClick={(e) => fetchWard()}
                      onChange={(e) => setWard(e.target.value)}
                      className={cx("formInput")}
                      placeholder=""
                    >
                      {wards.map((ward, index) => (
                        <option
                          key={index}
                          value={ward.ward_name}
                          className={cx("option")}
                        >
                          {ward.ward_name}
                        </option>
                      ))}
                      <option
                        defaultChecked
                        value={""}
                        className={cx("option", "defaultOpt")}
                      >
                        --Chọn phường xã--
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={cx("formInputField")}>
                <div className={cx("formLabel")}>
                  Địa chỉ <span className={cx("require")}>*</span>
                </div>
                <input
                  onChange={(e) =>
                    setAddress({ ...address, detail: e.target.value })
                  }
                  className={cx("formInput")}
                  placeholder=""
                ></input>
              </div>
            </div>
            <div className={cx("formOption")}>
              <div className={cx("exitBtn")}>
                {" "}
                <span
                  onClick={(e) => setHiddenForm(true)}
                  className={cx("btnTxt")}
                >
                  Hủy
                </span>{" "}
              </div>
              <div className={cx("addBtn")}>
                <span onClick={handleSubmit} className={cx("btnTxt", "add")}>
                  Thêm địa chỉ
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
