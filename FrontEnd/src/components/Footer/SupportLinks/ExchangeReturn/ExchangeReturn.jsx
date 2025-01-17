import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const ExchangeReturn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>HƯỚNG DẪN ĐỔI TRẢ</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <b>Trường hợp được đổi/trả hàng</b>
          <br />
          <br />
          <p>Sản phẩm mua rồi nhưng không ưng ý</p>
          <br />
          <p>
            - Người mua có thể trả hàng khi không vừa ý trong vòng 1h kể từ khi nhận hàng, Bean sẽ đổi sản phẩm cho khách. Sản phẩm muốn đổi hoặc trả cần giữ sản phâm nguyên đai, chưa mở nắp, chưa sử
            dụng. Không nhất thiết còn tem mác hay hỏng hộp. Không bị méo mó, biến dạng.
          </p>
          <br />
          <p>Sản phẩm mua bị lỗi</p>
          <br />
          <p>Quý khách vui lòng kiểm tra sản phẩm trước khi thanh toán. Trong trường hợp sản phẩm bị hư hại trong quá trình vận chuyển, quý khách vui lòng từ chối và gửi lại sản phẩm cho chúng tôi</p>
          <br />
          <p>Sản phẩm không sử dụng được ngay khi được giao</p>
          <br />
          <p>Trước tiên, hãy dành thời gian đọc kỹ tem hướng dẫn sử dụng và chắc rằng sản phẩm phù hợp với nhu cầu của bạn. Vui lòng liên hệ ngay cho chúng tôi để được hỗ trợ hồi trả lại hàng</p>
          <br />
          <p>Sản phẩm giao không đúng theo đơn đặt hàng</p>
          <br />
          <p>
            Bạn nghĩ rằng sản phẩm giao cho bạn không đúng với đơn đặt hàng? Hãy liên hệ với chúng tôi càng sớm càng tốt, hệ thống của chúng tôi sẽ kiểm tra nếu hàng của bạn bị gửi nhầm. Trong trường
            hợp đó, chúng tôi sẽ thay thế đúng mặt hàng bạn yêu cầu (khi có hàng).
          </p>
          <br />
          <b>Điều kiện đổi trả hàng</b>
          <br />
          <br />
          <p>Điều kiện về thời gian đổi trả: trong vòng 01 ngày kể từ khi nhận được hàng và phải liên hệ gọi ngay cho chúng tôi theo số điện thoại trên để được xác nhận đổi trả hàng.</p>
          <br />
          <b>Điều kiện đổi trả hàng:</b>
          <br />
          <br />
          <p>- Sản phẩm gửi lại phải còn nguyên đai nguyên kiện</p>
          <br />
          <p>- Phiếu bảo hành (nếu có) và tem của công ty trên sản phẩm còn nguyên vẹn.</p>
          <br />
          <p>- Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy Hướng dẫn sử dụng và chưa qua sử dụng.</p>
          <br />
          <p>- Quý khách chịu chi phí vận chuyển, đóng gói, thu hộ tiền, chi phí liên lạc tối đa tương đương 20% giá trị đơn hàng.</p>
          <br />
          <b>Quy trình đổi trả hàng</b>
          <br />
          <br />
          <p>
            Bước 1: Sau khi nhận được hàng. Yêu cầu quý vị kiểm tra kỹ 1 lần trước khi nhận hàng. Nếu có vấn đề xin vui lòng liên hệ Trung tâm hỗ trợ khách hàng tại thời điểm nhân viên giao hàng còn ở
            đó
          </p>
          <br />
          <p>- Trường hợp sau khi nhân viên giao hàng đã đi</p>
          <br />
          <p>- Nếu muốn đổi trả hàng có thể liên hệ với chúng tôi để được xử lý và hẹn lịch đổi trả hàng</p>
          <br />
          <p>Bước 2: Sau khi Trung tâm hỗ trợ khách hàng thông báo lịch hẹn nhận hàng trả</p>
          <br />
          <b>Trân trọng</b>
        </div>
      </div>
    </>
  );
};

export default ExchangeReturn;
