import style from "./Account.module.scss";
import className from "classnames/bind";
import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/Account/SideBar/SideBar";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../config/axios";
const cx = className.bind(style);

function Account() {
  const { decodedToken } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`/user/address`)
      .then(({ data }) => {
        setAddresses(data.addresses);
      })
      .catch((error) => {
        console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
      });
  }, []);

  return (
    <div className={cx("content")}>
      <div className={cx("wrapper")}>
        <SideBar />
        <div className={cx("main")}>
          <div className={cx("title")}>THÔNG TIN TÀI KHOẢN</div>
          <div className={cx("account-info")}>
            <strong>Họ tên: </strong>
            {decodedToken?.userName}
          </div>
          <div className={cx("account-info")}>
            <strong>Email: </strong>
            {decodedToken?.email}
          </div>
          {addresses[0] ? (
            <div className={cx("account-info")}>
              <strong>Địa chỉ: </strong>
              {addresses[0]?.detail}, {addresses[0]?.ward}, {addresses[0]?.district}, {addresses[0]?.province}
            </div>
          ) : null}
          {addresses[0] ? (
            <div className={cx("account-info")}>
              <strong>Số điện thoại: </strong>
              {addresses[0]?.phoneNumber}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Account;
