import style from "./OrderSuccess.module.scss";
import className from "classnames/bind";
import React, { useEffect } from "react";
import Lottie from "react-lottie";
import * as successAnimationData from "../../animation/Success.json";
import { useStateContext } from "../../context/CartContextProvider";

import { useNavigate } from "react-router-dom";
import axiosClient from "../../config/axios";
const cx = className.bind(style);

function OrderSuccess() {
  const { setCartItems, setQuantityInCart } = useStateContext();
  const navigate = useNavigate();
  useEffect(() => {
    const getCartItems = async () => {
      try {
        const response = await axiosClient.put(`/cart/get`);
        setQuantityInCart(response.data.quantity);
        setCartItems(response.data.quantity !== 0 ? response.data.products : []);
      } catch (error) {
        console.error("Đã có lỗi xảy ra", error);
      }
    };
    getCartItems();
    setTimeout(() => {
      navigate("/products");
    }, 3000);
  }, []);
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
        <Lottie options={successOptions} height={400} width={400} isStopped={false} />
        <div className={cx("messageContainer")}>
          <div className={cx("successMessage")}>THANH TOÁN THÀNH CÔNG</div>
          <div className={cx("messageDesc")}>BeanFashion xin chân thành cám ơn!</div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
