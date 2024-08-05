import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const PaymentPolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>CHÍNH SÁCH THANH TOÁN</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <div>
            <b>Khách hàng thanh toán trực tiếp tại cửa hàng</b>
          </div>
          <br />
          <div>+ Nhận ưu đãi</div>
          <br />
          <div>+ Nhận quà tặng kèm</div>
          <br />
          <div>+ Checkin tại cửa hàng</div>
          <br />
          <div>
            <b>Khách hàng thanh toán online</b>
          </div>
          <br />
          <div>+ Chuyển khoản trước khi nhận hàng</div>
          <br />
          <div>+ Quà tặng kèm bất kỳ</div>
          <br />
          <div>Khách hàng có nhu cầu khiếu nại, đổi trả sản phẩm do lỗi của Bean có thể liên hệ qua Hotline 1900 6750 để được hỗ trợ sớm nhất.</div>
          <br />
          <div>Tư vấn viên sẽ hướng dẫn khách hàng các bước cần thiết để tiến hành trả thanh toán.</div>
          <br />
        </div>
      </div>
    </>
  );
};

export default PaymentPolicies;
