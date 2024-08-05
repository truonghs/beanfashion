import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const Gift = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>QUÀ TẶNG TRI ÂN</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <p>Chương trình tri ân diễn ra vào ngày cuối tuần của tuần cuối hàng tháng</p>
          <br />
          <p>+ Với mong muốn mang đến cho Quý khách hàng những sản phẩm chất lượng tốt nhất đồng thời đi kèm với dịch vụ tốt nhất và chính sách chăm sóc khách hàng tuyệt vời nhất.</p>
          <br />
          <p>
            + Chương trình thẻ hội viên được xây dựng để tạo nên chính sách tri ân khách hàng đã tin chọn sản phẩm của chúng tôi. Quý khách mua sản phẩm của Bean sẽ được cộng dồn điểm tương ứng doanh
            số mua hàng với mỗi 100.000 VNĐ tương ứng với 1 điểm.
          </p>
          <br />
          <p>
            <b>1. Điều kiện để trở thành khách hàng thân thiết trong chính sách tri ân khách hàng</b>
          </p>
          <br />
          <p>+ Có mua ít nhất 01 sản phẩm bất kỳ có giá trị từ 1.000.000 VNĐ trở lên tại hệ thống và các gian hàng của Bean.</p>
          <br />
          <p>+ Cung cấp đầy đủ và chính xác thông tin cá nhân.</p>
          <br />
          <p>
            <b>Bean</b> xin thân tặng Quý khách hàng Chương trình
            <b>‘’ TRI ÂN KHÁCH HÀNG THÂN THIẾT ’’</b>
            như một lời tri ân sâu sắc cảm ơn sự tin yêu của quý khách dành cho <b>Bean</b>.
          </p>
          <br />
        </div>
      </div>
    </>
  );
};

export default Gift;
