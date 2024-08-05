import style from "./ResetPass.module.scss";
import className from "classnames/bind";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosClient from "../../config/axios";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";
const cx = className.bind(style);
function ResetPass() {
  const [isFullFilled, setIsFullFilled] = useState(true);
  const [isPassValid, setIsPassValid] = useState(true);

  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const state = useLocation();
  const token = state?.state?.token;
  const email = state?.state?.email;
  const navigate = useNavigate();
  const toast = useRef(null);

  const validateForm = () => {
    if (pass === "" || cpass === "") {
      setIsFullFilled(false);
      return false;
    } else {
      if (!isFullFilled) setIsFullFilled(true);
      if (pass !== cpass) {
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
        .post(`/auth/reset`, { newPassword: pass, token, email })
        .then(({ data }) => {
          toast.current.show({ severity: "success", summary: "Thành công", detail: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại!", life: 3000 });
          navigate("/login");
        })
        .catch((error) => {
          switch (error.response.status) {
            case 403: {
              toast.current.show({ severity: "error", summary: "Lỗi", detail: "OTP đã hết hạn. Vui lòng thử lại!", life: 3000 });
              break;
            }
            case 404: {
              toast.current.show({ severity: "error", summary: "Lỗi", detail: "Email không tồn tại!", life: 3000 });
              break;
            }
            case 500: {
              toast.current.show({ severity: "error", summary: "Lỗi", detail: "Đã có lỗi xãy ra, vui lòng thử lại!", life: 3000 });
              break;
            }
            default: {
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
          <div className={cx("title")}>Nhập mật khẩu mới của bạn</div>
          <div className={cx("backLine")}>
            <div className={cx("frontLine")}></div>
          </div>
          {!isFullFilled ? <div className={cx("warningTxt")}>Vui lòng nhập đầy đủ thông tin!</div> : !isPassValid ? <div className={cx("warningTxt")}>Nhập lại mật khẩu không trùng khớp!</div> : null}
          <div className={cx("inputLabel")}>Mật khẩu</div>
          <div className={cx("inputContainer")}>
            <input onChange={(e) => setPass(e.target.value)} type={isPrivate ? "password" : "text"} className={cx("inputField")} placeholder={isPrivate ? "******" : "abc123"}></input>
            <span onClick={() => setIsPrivate(!isPrivate)} className={cx("eye")}>
              {isPrivate ? <FaEyeSlash color="#01567f" /> : <FaEye color="#01567f" />}
            </span>
          </div>
          <div className={cx("inputLabel")}>Nhập lại mật khẩu</div>
          <div className={cx("inputContainer")}>
            <input onChange={(e) => setCpass(e.target.value)} type={isPrivate ? "password" : "text"} className={cx("inputField")} placeholder={isPrivate ? "******" : "abc123"}></input>
          </div>

          <button onClick={(e) => handleSubmit(e)} type="submit" className={cx("btnContainer")}>
            <div className={cx("btnTxt")}>XÁC NHẬN</div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
