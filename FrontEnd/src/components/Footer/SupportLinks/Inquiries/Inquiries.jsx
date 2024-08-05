import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const Inquiries = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>GIẢI ĐÁP THẮC MẮC</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <b>Khách hàng ở Tỉnh hoặc ở nước ngoài có mua được trên Web không? Cách giao dịch như thế nào?</b>
          <br />
          <br />
          <p>
            Hoàn toàn có thể được, Internet đã tạo ra môi trường làm việc không giới hạn khoảng cách địa lý. Hiện nay chúng tôi đã phục vụ được hơn 600.000 khách hàng trên toàn quốc và ở nước ngoài
          </p>
          <br />
          <p>Cách giao dịch khá đơn giản bạn chỉ cần thêm sản phẩm cần mua vào giỏ hàng sau đó tiến hành thanh toán</p>
          <br />
          <p>Khi đến trang thanh toán thì nhập các thông tin cần thiết như tên, số điện thoại, địa chỉ và tiến hành đặt hàng nhé!</p>
        </div>
      </div>
    </>
  );
};

export default Inquiries;
