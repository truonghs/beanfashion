import style from "./SideBar.module.scss";
import className from "classnames/bind";
import React, { useState, useEffect, useContext } from "react";
import axiosClient from "../../../config/axios";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
const cx = className.bind(style);

export default function SideBar() {
  const { decodedToken } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className={cx("sideBar")}>
      <div className={cx("greeting-user")}>
        <div className={cx("greeting")}>
          Xin chào, <span className={cx("user-name")}>{decodedToken?.userName}</span>
        </div>
      </div>
      <div className={cx("linkContainer")}>
        <Link className={currentPath == "/account" ? cx("linkBtn", "current") : cx("linkBtn")} to={"/account"}>
          Thông tin tài khoản
        </Link>
      </div>
      <div className={cx("linkContainer")}>
        <Link className={currentPath == "/account/orders" || currentPath.slice(0, 13) == "/order-detail" ? cx("linkBtn", "current") : cx("linkBtn")} to={"/account/orders"}>
          Đơn hàng của bạn
        </Link>
      </div>
      <div className={cx("linkContainer")}>
        <Link className={currentPath == "/account/changepass" ? cx("linkBtn", "current") : cx("linkBtn")} to={"/account/changepass"}>
          Đổi mật khẩu
        </Link>
      </div>
      <div className={cx("linkContainer")}>
        <Link className={currentPath == "/account/address" ? cx("linkBtn", "current") : cx("linkBtn")} to={"/account/address"}>
          Sổ địa chỉ
        </Link>
      </div>
    </div>
  );
}
