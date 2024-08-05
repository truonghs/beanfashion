import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const StockPolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>NHẬP HÀNG GIÁ SỈ</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <div>
            <b>1. ĐIỀU KIỆN BÁN SỈ</b>
          </div>
          <br />
          <div>- Chúng tôi cung cấp tất cả các mặt hàng có trên website chính thức</div>
          <br />
          <div>- Mỗi đơn hàng từ 10 sản phẩm hoặc số lượng nhất định đối với các mặt hàng khác của chúng tôi bạn được tính ngay với giá bán buôn.</div>
          <br />
          <div>- Kiểu dáng và màu sắc theo nhà sản xuất, một số mặt hàng đặc biệt sẽ theo yêu cầu của khách hàng.</div>
          <br />
          <div>- Không áp dụng giá chung cho tất cả mặt hàng, tùy loại mặt hàng, giá bán sỉ sẽ tùy vào số lượng mua hàng.</div>
          <br />
          <div>- Quý khách mua bao nhiêu chúng tôi sẽ báo giá bấy nhiêu, tùy theo từng lựa chọn của mỗi Quý khách.</div>
          <br />
          <div>
            <b>2. CHÍNH SÁCH GIÁ BÁN SỈ</b>
          </div>
          <br />
          <div>- Chính sách giá bán sỉ được áp dụng cho khách hàng mua số lượng càng lớn thì giá càng tốt hơn.</div>
          <br />
          <div>- Quý khách mua số lượng nhiều hơn hoặc khách từng mua sỉ và lâu năm có thể liên hệ trực tiếp nhận báo giá cùng với nhiều ưu đãi đặc biệt.</div>
          <br />
          <div>
            <b>2. CHÍNH SÁCH GIÁ BÁN SỈ</b>
          </div>
          <br />
          <div>- Chính sách giá bán sỉ được áp dụng cho khách hàng mua số lượng càng lớn thì giá càng tốt hơn.</div>
          <br />
          <div>- Quý khách mua số lượng nhiều hơn hoặc khách từng mua sỉ và lâu năm có thể liên hệ trực tiếp nhận báo giá cùng với nhiều ưu đãi đặc biệt.</div>
          <br />
          <div>
            <b>3. QUYỀN LỢI CỦA KHÁCH MUA SỈ</b>
          </div>
          <br />
          <div>
            - Chọn hàng trực tiếp tránh các mặt hàng lỗi - hư - rách do vận chuyển & lỗi của nhà sản xuất. Nếu Quý khách hàng ở Tỉnh khác hoặc ở Hà Nội & TP.HCM nhưng không có thời gian đến chúng tôi
            chọn mẫu thì chúng tôi sẽ hỗ trợ chụp hình thực tế từng món hàng quý khách đặt hoặc trực tuyến video cho quý khách kiểm tra trước khi đặt hàng
          </div>
          <br />
          <div>- Chúng tôi sẽ thông tin cho Quý khách khi có sản phẩm mới.</div>
          <br />
          <div>- Tất cả sản phẩm lấy tại hệ thống chúng tôi đều được cung cấp hình ảnh thực tế (nếu có nhu cầu).</div>
          <br />
          <div>- Miễn phí giao hàng tận nơi cho tất cả khách nội thành TP.HCM.</div>
          <br />
          <div>
            <b>4. THANH TOÁN</b>
          </div>
          <br />
          <div>- Quý khách vui lòng thanh toán ngay khi giao hàng.</div>
          <br />
          <div>- Với đơn hàng từ 20 triệu đồng trở lên và lấy hóa đơn, Quý khách được chuyển khoản khi thanh toán.</div>
          <br />
          <div>- Quý khách vui lòng xem thêm phần chính sách vận chuyển để biết thêm chi tiết về thanh toán phí vận chuyển.</div>
          <br />
        </div>
      </div>
    </>
  );
};

export default StockPolicies;
