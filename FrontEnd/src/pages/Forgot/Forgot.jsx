import style from "./Forgot.module.scss";
import className from "classnames/bind";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../../config/axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const cx = className.bind(style);
function Forgot() {
  const [isFullFilled, setIsFullFilled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [email, setEmail] = useState("");
  const toast = useRef(null);
  const navigate = useNavigate();
  const validateForm = () => {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    if (email === "") {
      setIsFullFilled(false);
      return false;
    } else {
      if (!isFullFilled) setIsFullFilled(true);
      if (!emailRegex.test(email)) {
        setIsEmailValid(false);
        return false;
      } else {
        if (!isEmailValid) setIsEmailValid(true);
      }
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axiosClient
        .post(`/auth/forgot`, { email })
        .then(({ data }) => {
          navigate("/otp", { state: { email: email } });
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404: {
              toast.current.show({ severity: 'error', summary: 'Lỗi', detail: "Email không tồn tại", life: 3000 });
              break;
            }
            case 500: {
              toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Đã có lỗi xãy ra, vui lòng thử lại!', life: 3000 });
              break;
            }
          }
        });
    }
  };
  return (
    <div>
      <Toast ref={toast} />
      <div className={cx("mainContainer")}>
        <form className={cx("formContainer")}>
          <div className={cx("title")}>Nhập email của bạn</div>
          <div className={cx("backLine")}>
            <div className={cx("frontLine")}></div>
          </div>
          {!isFullFilled ? <div className={cx("warningTxt")}>Vui lòng nhập đầy đủ thông tin!</div> : !isEmailValid ? <div className={cx("warningTxt")}>Email không hợp lệ!</div> : null}
          <div className={cx("inputLabel")}>Email</div>
          <div className={cx("inputContainer")}>
            <input onChange={(e) => setEmail(e.target.value)} className={cx("inputField")} placeholder="abc@gmail.com"></input>
          </div>

          <button onClick={(e) => handleSubmit(e)} type="submit" className={cx("btnContainer")}>
            <div className={cx("btnTxt")}>XÁC NHẬN</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
