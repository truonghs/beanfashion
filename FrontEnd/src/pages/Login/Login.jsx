import { Link, useNavigate } from "react-router-dom";
import style from "./Login.module.scss";
import className from "classnames/bind";
import { FaFacebookF, FaGooglePlusG, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import axiosClient from "../../config/axios";
import { AuthContext } from "../../context/AuthContext";
import { Toast } from "primereact/toast";
const cx = className.bind(style);
function Login() {
  const [isPrivate, setIsPrivate] = useState(true);
  const [isFullFilled, setIsFullFilled] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isRemember, setIsRemember] = useState(false);
  const toast = useRef(null);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    pass: "",
  });
  const { isAuth, setIsAuth, setDecodedToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const validateForm = () => {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    if (loginInfo.email === "" || loginInfo.pass === "") {
      setIsFullFilled(false);
      return false;
    } else {
      if (!isFullFilled) setIsFullFilled(true);
      if (!emailRegex.test(loginInfo.email)) {
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
    if (!isAuth) {
      if (validateForm()) {
        const user = {
          email: loginInfo.email,
          password: loginInfo.pass,
          isRemember,
        };
        axiosClient
          .post(`/auth/login`, user)
          .then(({ data }) => {
            const token = data.token;
            if (token) {
              const decodedToken = jwtDecode(token);
              setDecodedToken(decodedToken);
              setIsAuth(true);
              navigate("/");
            } else {
              toast.current.show({ severity: "error", summary: "Lỗi", detail: "Vui lòng xác thực email!", life: 3000 });
              console.log("Please verify your email!");
            }
          })
          .catch((error) => {
            switch (error.response.status) {
              case 401: {
                toast.current.show({ severity: "error", summary: "Lỗi", detail: "Email hoặc mật khẩu không đúng!", life: 3000 });
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
    } else {
      toast.current.show({ severity: "error", summary: "Lỗi", detail: "Bạn đã đăng nhập. Vui lòng đăng xuất trước khi đăng nhập tài khoản khác!", life: 3000 });
    }
  };
  return (
    <div>
      <Toast ref={toast} />
      <div className={cx("mainContainer")}>
        <form className={cx("formContainer")}>
          <div className={cx("title")}>ĐĂNG NHẬP</div>
          <div className={cx("backLine")}>
            <div className={cx("frontLine")}></div>
          </div>
          {!isFullFilled ? <div className={cx("warningTxt")}>Vui lòng nhập đầy đủ thông tin!</div> : !isEmailValid ? <div className={cx("warningTxt")}>Email không hợp lệ!</div> : null}
          <div className={cx("inputLabel")}>Email</div>
          <div className={cx("inputContainer")}>
            <input type="email" onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })} className={cx("inputField")} placeholder="abc@gmail.com"></input>
          </div>
          <div className={cx("inputLabel")}>Mật khẩu</div>
          <div className={cx("inputContainer")}>
            <input type={isPrivate ? "password" : "text"} onChange={(e) => setLoginInfo({ ...loginInfo, pass: e.target.value })} className={cx("inputField")} placeholder="abc123"></input>
            <span onClick={() => setIsPrivate(!isPrivate)} className={cx("eye")}>
              {isPrivate ? <FaEyeSlash color="#01567f" /> : <FaEye color="#01567f" />}
            </span>
          </div>
          <div className={cx("rememberContainer")}>
            <div onClick={(e) => setIsRemember(!isRemember)} className={cx("remember")}>
              <input checked={isRemember} onChange={() => {}} type="checkbox" className={cx("rememberCheckBox")}></input>
              <div className={cx("rememberTxt")}>Ghi nhớ</div>
            </div>
          </div>
          <button onClick={(e) => handleSubmit(e)} type="submit" className={cx("btnContainer")}>
            <div className={cx("btnTxt")}>ĐĂNG NHẬP</div>
          </button>
          <div className={cx("linkContainer")}>
            <Link to={"/forgot"} className={cx("forgotLink")}>
              Quên mật khẩu?
            </Link>
            <Link to={"/register"} className={cx("registerLink")}>
              Đăng ký tại đây
            </Link>
          </div>
          <div className={cx("optionTitle")}>hoặc đăng nhập qua</div>
          <div className={cx("optionContainer")}>
            <div className={cx("facebookBtn")}>
              <FaFacebookF color="#fff" />
              <div className={cx("separate")}></div>
              <div className={cx("optionTxt")}>FACEBOOK</div>
            </div>
            <div className={cx("googleBtn")}>
              <FaGooglePlusG color="#fff" size={30} />
              <div className={cx("separate")}></div>
              <div className={cx("optionTxt")}>GOOGLE</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
