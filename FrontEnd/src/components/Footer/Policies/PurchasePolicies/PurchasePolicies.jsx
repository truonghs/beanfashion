import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const PurcharePolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>HƯỚNG DẪN MUA HÀNG</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <div>
            <b>Bước 1:</b> Truy cập website và lựa chọn sản phẩm cần mua để mua hàng
          </div>
          <br />
          <div>
            <b>Bước 2:</b> Click và sản phẩm muốn mua, màn hình hiển thị ra pop up với các lựa chọn sau
          </div>
          <br />
          <div>Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua hàng để lựa chọn thêm sản phẩm vào giỏ hàng</div>
          <br />
          <div>Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem giỏ hàng</div>
          <br />
          <div>Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng bấm vào: Đặt hàng và thanh toán</div>
          <br />
          <div>
            <b>Bước 3:</b> Lựa chọn thông tin tài khoản thanh toán
          </div>
          <br />
          <div>Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email và mật khẩu vào mục đã có tài khoản trên hệ thống</div>
          <br />
          <div>
            Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng điền các thông tin cá nhân để tiếp tục đăng ký tài khoản. Khi có tài khoản bạn sẽ dễ dàng theo dõi được đơn hàng của mình
          </div>
          <br />
          <div>Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp chuột vào mục đặt hàng không cần tài khoản</div>
          <br />
          <div>
            <b>Bước 4:</b> Điền các thông tin của bạn để nhận đơn hàng, lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình
          </div>
          <br />
          <div>
            <b>Bước 5:</b> Xem lại thông tin đặt hàng, điền chú thích và gửi đơn hàng
          </div>
          <br />
          <div>Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.</div>
          <br />
          <div>Trân trọng cảm ơn.</div>
          <br />
        </div>
      </div>
    </>
  );
};

export default PurcharePolicies;
