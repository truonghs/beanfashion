import style from "./PaymentStatus.module.scss";
import className from "classnames/bind";
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import * as successAnimationData from "../../animation/Success.json";
import * as failAnimationData from "../../animation/Fail.json";
import { useStateContext } from "../../context/CartContextProvider";

import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";
const cx = className.bind(style);

function PaymentStatus() {
  const [status, setStatus] = useState("");
  const [isStopped, setIsStopped] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { setCartItems, setQuantityInCart } = useStateContext();
  const searchParams = new URLSearchParams(location.search);
  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  const getCartItems = async () => {
    try {
      const response = await axiosClient.get(`/cart/get`)
      setQuantityInCart(response.data.quantity);
      setCartItems(response.data.quantity !== 0 ? response.data.products : []);
    } catch (error) {
      console.error("Đã có lỗi xảy ra", error);
    }
  };
  useEffect(() => {
    axiosClient
      .post(`order/vnpay/create`, params)
      .then(({ data }) => {
        getCartItems();
        setStatus(data.status === "00" ? "s" : "f");
        setIsStopped(false);
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      })
      .catch((error) => {
        console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
        console.log(error.response);
      });
  }, []);
  const failOptions = {
    loop: false,
    autoplay: true,
    animationData: failAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const successOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <Lottie options={status === "f" ? failOptions : successOptions} height={400} width={400} isStopped={isStopped} />
        {status === "f" ? (
          <div className={cx("messageContainer")}>
            <div className={cx("failMessage")}>THANH TOÁN THẤT BẠI</div>
            <div className={cx("messageDesc")}>Vui lòng kiểm tra lại đơn hàng!</div>
          </div>
        ) : null}

        {status === "s" ? (
          <div className={cx("messageContainer")}>
            <div className={cx("successMessage")}>THANH TOÁN THÀNH CÔNG</div>
            <div className={cx("messageDesc")}>BeanFashion xin chân thành cám ơn!</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PaymentStatus;
