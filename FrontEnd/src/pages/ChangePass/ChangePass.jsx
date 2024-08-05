import style from "./ChangePass.module.scss";
import className from "classnames/bind";
import { IoIosArrowForward } from "react-icons/io";
import React, { useState, useRef, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SideBar from "../../components/Account/SideBar/SideBar";
import axiosClient from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useStateContext } from "../../context/CartContextProvider";
import { Messages } from "primereact/messages";
import { Toast } from "primereact/toast";

const cx = className.bind(style);

function ChangePass() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, setDecodedToken } = useContext(AuthContext);
  const { setCartItems, quantityInCart, setQuantityInCart } = useStateContext();
  const [isPrivate, setIsPrivate] = useState(true);
  const [changePassInfo, setChangePassInfo] = useState({
    oldPass: "",
    pass: "",
    cpass: "",
  });
  const [isFullFilled, setIsFullFilled] = useState(true);
  const [isPassValid, setIsPassValid] = useState(true);
  const toast = useRef(null);

  const error = (message) => {
    toast.current.show({ severity: 'error', summary: 'Lỗi', detail: message, life: 3000 });
  }

  const validateForm = () => {
    if (changePassInfo.oldPass === "" || changePassInfo.pass === "" || changePassInfo.cpass === "") {
      setIsFullFilled(false);
      return false;
    } else {
      if (changePassInfo.pass !== changePassInfo.cpass) {
        if (!isFullFilled) setIsFullFilled(true);
        setIsPassValid(false);
        return false;
      } else {
        if (!isPassValid) setIsPassValid(true);
      }
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axiosClient
        .post(`/auth/change-password`, { oldPassword: changePassInfo.oldPass, newPassword: changePassInfo.pass })
        .then((response) => {
          addMessages();
          axiosClient
            .get(`/auth/logout`)
            .then((response) => {
              setIsAuth(false);
              setCartItems([]);
              setQuantityInCart(0);
              setDecodedToken(null);
              navigate("/login");
            })
            .catch((error) => {
              console.log(`Logout failed! ${error.response.data.message}`);
            });
        })
        .catch((error) => {
          toast.current.show({ severity: 'error', summary: 'Lỗi', detail: error.response.data.message, life: 3000 });
        });
    }
  };
  const msgs = useRef(null);
  const addMessages = () => {
    msgs.current.show([
      { severity: "success", summary: "Success", detail: "Message Content", sticky: true, closable: false },
      { severity: "info", summary: "Info", detail: "Message Content", sticky: true, closable: false },
      { severity: "warn", summary: "Warning", detail: "Message Content", sticky: true, closable: false },
      { severity: "error", summary: "Error", detail: "Message Content", sticky: true, closable: false },
    ]);
  };

  const clearMessages = () => {
    msgs.current.clear();
  };

  return (
    <div className={cx("content")}>
      <Toast ref={toast} />
      <div className={cx("wrapper")}>
        <SideBar />
        <Messages ref={msgs} />
        <div className={cx("main")}>
          <div className={cx("title")}>ĐỔI MẬT KHẨU</div>
          <div className={cx("warning")}>Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí tự</div>
          {!isFullFilled ? <div className={cx("warningTxt")}>Vui lòng nhập đầy đủ thông tin!</div> : !isPassValid ? <div className={cx("warningTxt")}>Nhập lại mật khẩu không khớp!</div> : null}
          <div className={cx("old-pass")}>
            <div className={cx("content-text")}>
              Mật khẩu cũ <span className={cx("require")}>*</span>
            </div>
            <div className={cx("content-input")}>
              <input onChange={(e) => setChangePassInfo({ ...changePassInfo, oldPass: e.target.value })} type={isPrivate ? "password" : "text"}></input>
              <span onClick={() => setIsPrivate(!isPrivate)} className={cx("eye")}>
                {isPrivate ? <FaEyeSlash color="#01567f" /> : <FaEye color="#01567f" />}
              </span>
            </div>
          </div>
          <div className={cx("new-pass")}>
            <div className={cx("content-text")}>
              Mật khẩu mới <span className={cx("require")}>*</span>
            </div>
            <div className={cx("content-input")}>
              <input onChange={(e) => setChangePassInfo({ ...changePassInfo, pass: e.target.value })} type={isPrivate ? "password" : "text"}></input>
            </div>
          </div>
          <div className={cx("confirm-pass")}>
            <div className={cx("content-text")}>
              Xác nhận lại mật khẩu <span className={cx("require")}>*</span>
            </div>
            <div className={cx("content-input")}>
              <input onChange={(e) => setChangePassInfo({ ...changePassInfo, cpass: e.target.value })} type={isPrivate ? "password" : "text"}></input>
            </div>
          </div>

          <div onClick={(e) => handleSubmit(e)} className={cx("change-pass-button")}>
            <button className={cx("btn-change-pass")}>Đặt lại mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePass;
