import React, { useState } from 'react';
import style from "./Footer.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const cx = className.bind(style);
function Footer() {
  const [currentPage, setCurrentPage] = useState("/home");
  return (
    <div className={cx("container")}>
      <footer className={cx("footer")}>
        <div className={cx("footer__section")}>
          <h3>THÔNG TIN CHUNG</h3>
          <p>
            Với sứ mệnh "Khách hàng là ưu tiên số 1" chúng
            <br /> tôi luôn mạng lại giá trị tốt nhất
          </p>

          <p>
            <span>
              <strong>Địa chỉ:</strong>
            </span>{" "}
            70 Lữ Gia, Phường 15, Quận 11, <br />
            Thành phố Hồ Chí Minh
          </p>
          <p>
            <span>
              <strong>Điện thoại:</strong>
            </span>
            <Link href="tel:1900 6750">
              <span className={cx("highlight")}>1900 6750</span>
            </Link>
          </p>

          <p>
            <span>
              <strong>Email:</strong>
            </span>
            <Link href="malto:support@sapo.vn">
              <span className={cx("highlight")}>support@sapo.vn</span>
            </Link>
          </p>
          <div className={cx("footer_list_social_network")}>
            <div className={cx("footer_list_social_network-item")}>
              <Link href="">
                <FaFacebookF />
              </Link>
            </div>
            <div className={cx("footer_list_social_network-item")}>
              <Link href="">
                <FaTwitter />
              </Link>
            </div>
            <div className={cx("footer_list_social_network-item")}>
              <Link href="">
                <FaYoutube />
              </Link>
            </div>
            <div className={cx("footer_list_social_network-item")}>
              <Link href="">
                <RiInstagramFill />
              </Link>
            </div>
          </div>
        </div>
        <div className={cx("footer__section", "mt-horizontal")}>
          <h3>BÀI VIẾT MỚI</h3>
          <div className={cx("list-news")}>
            <div>
              <Link>
                <img
                  src="https://bizweb.dktcdn.net/100/451/884/articles/4-kieu-trang-phuc-demin-hot-nhat.jpg?v=1649173718847"
                  alt="thumb"
                  className={cx("newsthumb")}
                />
                <div>
                  <p>
                    4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho
                    các nàng
                  </p>
                  <span>05/04/2022</span>
                </div>
              </Link>
            </div>
            <div>
              <Link>
                <img
                  src="https://bizweb.dktcdn.net/100/451/884/articles/4-kieu-trang-phuc-demin-hot-nhat.jpg?v=1649173718847"
                  alt="thumb"
                  className={cx("newsthumb")}
                />
                <div>
                  <p>
                    4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho
                    các nàng
                  </p>
                  <span>05/04/2022</span>
                </div>
              </Link>
            </div>
            <div>
              <Link>
                <img
                  src="https://bizweb.dktcdn.net/100/451/884/articles/4-kieu-trang-phuc-demin-hot-nhat.jpg?v=1649173718847"
                  alt="thumb"
                  className={cx("newsthumb")}
                />
                <div>
                  <p>
                    4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho
                    các nàng
                  </p>
                  <span>05/04/2022</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className={cx("footer__section", "mt-horizontal")}>
          <h3>VỀ CHÚNG TÔI</h3>
          <ul>
            <li>
              <Link>Trang chủ</Link>
            </li>
            <li>
              <Link>Nữ</Link>
            </li>
            <li>
              <Link>Nam</Link>
            </li>
            <li>
              <Link>Trẻ em</Link>
            </li>
            <li>
              <Link>Sản phẩm</Link>
            </li>
            <li>
              <Link>Tin tức</Link>
            </li>
            <li>
              <Link>Liên hệ</Link>
            </li>
          </ul>
        </div>
        <div className={cx("footer__section", "mt-horizontal")}>
          <h3>HỖ TRỢ</h3>
          <ul>
            <li>
              <Link className={cx("link")} to={"/inquiries-support"} onClick={() => setCurrentPage('inquiries-support')}>Giải đáp thắc mắc</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/exchange-support"} onClick={() => setCurrentPage('exchange-support')}>Hướng dẫn đổi trả</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/size-support"} onClick={() => setCurrentPage('size-support')}> Hướng dẫn chọn size</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/payment-support"} onClick={() => setCurrentPage('payment-support')}>Hướng dẫn thanh toán</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/collab-support"} onClick={() => setCurrentPage('collab-support')}>Chương trình cộng tác viên</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/advice-support"} onClick={() => setCurrentPage('advice-support')}>Tư vấn bán sỉ</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/gift-support"} onClick={() => setCurrentPage('gift-support')}>Quà tặng tri ân</Link>
            </li>
          </ul>
        </div>
        <div className={cx("footer__section")}>
          <h3>CHÍNH SÁCH</h3>
          <ul>
            <li>
              <Link className={cx("link")} to={"/membership-policies"} onClick={() => setCurrentPage('membership-policies')}>Chính sách thành viên</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/payment-policies"} onClick={() => setCurrentPage('payment-policies')}>Chính sách thanh toán</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/purchase-policies"} onClick={() => setCurrentPage('purchase-policies')}>Hướng dẫn mua hàng</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/exchange-policies"} onClick={() => setCurrentPage('exchange-policies')}>Chính sách đổi sản phẩm</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/security-policies"} onClick={() => setCurrentPage('security-policies')}>Bảo mật thông tin cá nhân</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/stock-policies"} onClick={() => setCurrentPage('stock-policies')}>Nhập hàng giá sỉ</Link>
            </li>
            <li>
              <Link className={cx("link")} to={"/collab-policies"} onClick={() => setCurrentPage('collab-policies')}>Chính sách cộng tác viên</Link>
            </li>
          </ul>
        </div>
        <div className={cx("footer__section-group")}></div>
      </footer>
      <p className={cx("license")}>© Bản quyền thuộc về Mr. Bean | Cung cấp bởi Sapo</p>
    </div>
  );
}

export default Footer;
