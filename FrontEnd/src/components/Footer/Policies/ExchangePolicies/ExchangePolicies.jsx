import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const ExchangePolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>CHÍNH SÁCH ĐỔI SẢN PHẨM</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <div>+ Sản phẩm lỗi, hỏng do quá trình sản xuất hoặc vận chuyện</div>
          <br />
          <div>+ Nằm trong chính sách đổi trả sản phẩm của Bean</div>
          <br />
          <div>+ Sản phẩm còn nguyên tem mác chưa qua sử dụng và chưa giặt là</div>
          <br />
          <div>+ Thời gian đổi trả nhỏ hơn 15 ngày kể từ ngày nhận hàng</div>
          <br />
          <div>+ Chi phí bảo hành về sản phẩm, vận chuyển khách hàng chịu chi phí </div>
          <br />
          <div>+ Đối với khách VIP thì khi đổi trả Bean sẽ hỗ trợ miễn phí quá trình đổi trả, sửa chữa</div>
          <br />
          <div>
            <b>Điều kiện đổi trả hàng</b>
          </div>
          <br />
          <div>Điều kiện về thời gian đổi trả: trong vòng 01 ngày kể từ khi nhận được hàng và phải liên hệ gọi ngay cho chúng tôi theo số điện thoại trên để được xác nhận đổi trả hàng.</div>
          <br />
          <div>
            <b>Điều kiện đổi trả hàng:</b>
          </div>
          <br />
          <div>- Sản phẩm gửi lại phải còn nguyên đai nguyên kiện</div>
          <br />
          <div>- Phiếu bảo hành (nếu có) và tem của công ty trên sản phẩm còn nguyên vẹn.</div>
          <br />
          <div>- Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy Hướng dẫn sử dụng và chưa qua sử dụng.</div>
          <br />
          <div>- Quý khách chịu chi phí vận chuyển, đóng gói, thu hộ tiền, chi phí liên lạc tối đa tương đương 20% giá trị đơn hàng.</div>
          <br />
          <div>
            <b>Quy trình đổi trả hàng</b>
          </div>
          <br />
          <div>
            Bước 1: Sau khi nhận được hàng. Yêu cầu quý vị kiểm tra kỹ 1 lần trước khi nhận hàng. Nếu có vấn đề xin vui lòng liên hệ Trung tâm hỗ trợ khách hàng tại thời điểm nhân viên giao hàng còn ở
            đó
          </div>
          <br />
          <div>- Trường hợp sau khi nhân viên giao hàng đã đi</div>
          <br />
          <div>- Nếu muốn đổi trả hàng có thể liên hệ với chúng tôi để được xử lý và hẹn lịch đổi trả hàng</div>
          <br />
          <div>Bước 2: Sau khi Trung tâm hỗ trợ khách hàng thông báo lịch hẹn nhận hàng trả</div>
          <br />
        </div>
      </div>
    </>
  );
};

export default ExchangePolicies;
