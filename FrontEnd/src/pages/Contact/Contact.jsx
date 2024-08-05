import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import axiosClient from "../../config/axios";
import { checkEmptyKeys, generateErrorMessage } from "../../utils";
import className from "classnames/bind";
import style from "./Contact.module.scss";
const cx = className.bind(style);

function Contact() {
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    content: "",
  });
  const [errors, setErrors] = useState({});
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const sendContactInfo = () => {
    const newErrors = {};
    const emptyKeys = checkEmptyKeys(contactInfo);
    emptyKeys.forEach((key) => {
      newErrors[key] = generateErrorMessage(key);
    });
    if (!emailRegex.test(contactInfo.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!regexPhoneNumber.test(contactInfo.phoneNumber)) {
      newErrors.phoneNumber = "Số diện thoại không hợp lệ";
    }
    if (Object.keys(newErrors).length > 1) {
      setErrors(newErrors);
    } else {
      axiosClient
        .post("/contact/store", contactInfo)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className={cx("bodyWrap")}>
      <div className={cx("layoutContact")}>
        <div className={cx("textFormMap")}>
          <div className={cx("textAndForm")}>
            <div className={cx("contactInfo")}>
              <div className={cx("infoTitle")}>
                <b>NƠI GIẢI ĐÁP TOÀN BỘ MỌI THẮC MẮC CỦA BẠN?</b>
              </div>
              <div className={cx("infoQuote")}>Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng tôi luôn mang lại giá trị tốt nhất</div>
              <div className={cx("info")}>
                <div className={cx("address")}>
                  <b>Địa chỉ: </b>70 Lữ Gia, Phường 15, Quận 11, Thành phố Hồ Chí Minh
                </div>
                <div className={cx("hotline")}>
                  <div>
                    <b>Hotline:</b>
                  </div>
                  <div className={cx("phoneNumber")}>1900 6750</div>
                </div>
                <div className={cx("emailInfo")}>
                  <div>
                    <b>Email: </b>
                  </div>
                  <div className={cx("email")}>support@sapo.vn</div>
                </div>
              </div>
            </div>
            <div className={cx("formContact")}>
              <div className={cx("formTitle")}>
                <b>LIÊN HỆ VỚI CHÚNG TÔI</b>
              </div>
              <div className={cx("nameEmail")}>
                <div className={cx("inputNameEmail")}>
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={contactInfo.fullName}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        fullName: e.target.value,
                      })
                    }
                  />
                  {errors?.fullName ? <div className={cx("error-text")}>{errors.fullName}</div> : null}
                </div>
                <div className={cx("inputNameEmail")}>
                  <input type="text" placeholder="Email" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} />
                  {errors?.email ? <div className={cx("error-text")}>{errors.email}</div> : null}
                </div>
              </div>
              <div className={cx("inputPhone")}>
                <input
                  type="text"
                  placeholder="Điện thoại"
                  value={contactInfo.phoneNumber}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      phoneNumber: e.target.value,
                    })
                  }
                />
                {errors?.phoneNumber ? <div className={cx("error-text")}>{errors.phoneNumber}</div> : null}
              </div>
              <div className={cx("inputContent")}>
                <input type="text" placeholder="Nội dung" value={contactInfo.content} onChange={(e) => setContactInfo({ ...contactInfo, content: e.target.value })} />
                {errors?.content ? <div className={cx("error-text")}>{errors.content}</div> : null}
              </div>
              <div className={cx("submitInfo")}>
                <button className={cx("buttonSubmit")} type="submit" onClick={sendContactInfo}>
                  Gửi thông tin
                </button>
              </div>
            </div>
          </div>
          <div className={cx("map")}>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.231240416692!2d106.80047917465674!3d10.870008889284488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1711589812685!5m2!1svi!2s"
              width={565}
              height={450}
              allowFullScreen={""}
              loading={"lazy"}
              referrerPolicy={"no-referrer-when-downgrade"}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
