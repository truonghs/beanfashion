import React, { useEffect } from "react";
import className from "classnames/bind";
import style from "../../SupportLinksAndPolicies.scss";
import { IoIosArrowForward } from "react-icons/io";
const cx = className.bind(style);

const CollabPolicies = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={cx("page")}>
        <div className={cx("title")}>
          <b>CHÍNH SÁCH CỘNG TÁC VIÊN</b>
          <br />
          <br />
        </div>
        <div className={cx("content")}>
          <div>
            <b>Chính sách hoa hồng chung:</b> là chính sách áp dụng cho toàn bộ sản phẩm trên website ngoại trừ đi các sản phẩm có mức hoa hồng đặc biệt thiết lập tại mục “Chính sách hoa hồng theo sản
            phẩm”. Khi đối tác giới thiệu các đơn hàng chỉ chứa sản phẩm thông thường (không nằm trong danh sách sản phẩm có hoa hồng đặc biệt) thì sẽ được tính toán mức hoa hồng như chính sách chung.
            Để thiết lập chính sách hoa hồng chung, bạn cần chọn:
          </div>
          <br />
          <div>
            <b>Kiểu chính sách</b> với 1 trong 2 kiểu chính sách có thể áp dụng là:
          </div>
          <br />
          <div>% hoa hồng theo giá trị đơn hàng</div>
          <br />
          <div>Số tiền cố định theo mỗi đơn hàng</div>
          <br />
          <div>
            Và <b>Giá trị đơn hàng áp dụng</b> theo:
          </div>
          <br />
          <div>Tổng giá trị đơn hàng không có phí vận chuyển: hoa hồng của đối tác được tính trên tổng giá trị đơn hàng trừ đi phí vận chuyển</div>
          <br />
          <div>Tổng giá trị đơn hàng bao gồm phí vận chuyển: Hoa hồng của đối tác sẽ được tính trên tổng giá trị đơn hàng có bao gồm phí vận chuyển</div>
          <br />
          <div>
            <b>Chính sách hoa hồng theo sản phẩm</b> (Tùy chọn): là chính sách chỉ áp dụng cho 1 danh sách sản phẩm hay danh mục sản phẩm tùy chọn. Khi đơn hàng chỉ chứa các sản phẩm có mức hoa hồng
            đặc biệt thì sẽ áp dụng mức hoa hồng được thiết lập cho từng sản phẩm để tính ra mức hoa hồng cho đối tác. Để thiết lập chính sách hoa hồng theo sản phẩm bạn cần:
          </div>
          <br />
          <div>
            <b>Lựa chọn sản phẩm</b>, bạn có thể chọn đích danh 1 sản phẩm cụ thể hoặc chọn cả danh mục sản phẩm
          </div>
          <br />
          <div>
            Chọn loại <b>Hoa hồng áp dụng</b>: Theo phần trăm (%) hoặc Theo số tiền (đ)
          </div>
          <br />
          <div>
            Tiếp theo, bạn chọn <b>Xác nhận</b> để hoàn tất thiết lập chính sách hoa hồng cho sản phẩm
          </div>
          <br />
          <div>
            Sau khi <b>Xác nhận</b>, sản phẩm / danh mục sản phẩm thuộc chính sách hoa hồng theo sản phẩm sẽ hiển thị ở mục <b>Danh sách hoa hồng theo sản phẩm</b>
          </div>
          <br />
          <div>
            <b>Trân Trọng!</b>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default CollabPolicies;
