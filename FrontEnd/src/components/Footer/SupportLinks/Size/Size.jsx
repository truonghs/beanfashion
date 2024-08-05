import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const Size = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>HƯỚNG DẪN CHỌN SIZE</b>
        </div>
        <div className={cx("content")}>
          <br />
          <p>Một số bảng size chuẩn mà Bean muốn gửi bến bạn.</p>
          <br />
          <b>+ ÁO POLO</b>
          <br />
          <br />
          <div className={cx("sizeImage")}>
            <img src="//bizweb.dktcdn.net/100/451/884/files/img-size.png?v=1650034072679" height={1600} width={1200} alt="" />
          </div>
          <b>+ ÁO COTTON</b>
          <br />
          <br />
          <div className={cx("sizeImage")}>
            <img src="//bizweb.dktcdn.net/100/451/884/files/img-size2.png?v=1650034124971" height={1600} width={1200} alt="" />
          </div>
          <b>+ ÁO PHÔNG</b>
          <br />
          <br />
          <div className={cx("sizeImage")}>
            <img src="//bizweb.dktcdn.net/100/451/884/files/img-size3-min.png?v=1650034166187" height={1600} width={1200} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Size;
