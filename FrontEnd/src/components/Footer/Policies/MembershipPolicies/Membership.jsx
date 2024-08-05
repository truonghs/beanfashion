import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const MembershipPolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>CHÍNH SÁCH THÀNH VIÊN</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <div>Điều kiện chính sách thành viên</div>
          <br />
          <div>
            <b>1. Thẻ thành viên</b>
          </div>
          <br />
          <div>Điều kiện cấp thẻ thành viên: Khi khách hàng mua hàng trên hệ thống cửa hàng Bean Fashion sẽ được cấp thẻ thành viên.</div>
          <br />
          <div>
            <b>2. Thẻ VIP</b>
          </div>
          <br />
          <div>
            <b>Điều kiện nhận thẻ VIP:</b>
          </div>
          <br />
          <div>+ Có giá trị tổng đơn hàng lớn hơn 15 triệu/ tháng</div>
          <br />
          <div>+ Mua hàng với giá trị 5 triệu trợ lên</div>
          <br />
          <div>+ Tham gia các hoạt động, chương trình khuyến mãi của Bean</div>
          <br />
          <div>
            <b>Lưu ý:</b> Hạn mức 10, 20, 30, 50,100 triệu đồng là tính từ thời điểm bắt đầu mua tới khi lên thẻ. Khi lên thẻ VIP và tích tiếp lên 20 đến 100 triệu, tổng tiền này là tính từ khi khách
            hàng mua lần đầu và cộng dồn lên.
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default MembershipPolicies;
