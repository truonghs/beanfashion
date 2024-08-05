import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import className from "classnames/bind";
import style from "./Header.module.scss";

import { LiaPhoneSolid } from "react-icons/lia";
import { CiLocationOn } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { SlLogin, SlLogout, SlUser } from "react-icons/sl";
import { PiUserPlus, PiUser } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaGift } from "react-icons/fa6";
import { IoChevronDownSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { BreadCrumb } from "primereact/breadcrumb";
import Search from "../../components/Search/Search";
import axiosClient from "../../config/axios";
import { AuthContext } from "../../context/AuthContext";
import { useStateContext } from "../../context/CartContextProvider";
const cx = className.bind(style);
function Header({ setShowModal }) {
  const [searchVisible, setSearchVisible] = useState(false);

  const { isAuth, setIsAuth, setDecodedToken } = useContext(AuthContext);
  const { setCartItems, quantityInCart, setQuantityInCart } = useStateContext();
  const getQuantityInCart = async () => {
    try {
      const response = await axiosClient.get("/cart/get");
      setQuantityInCart(response.data.quantity);
      setCartItems(response.data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuth) getQuantityInCart();
  }, [isAuth]);

  const navigate = useNavigate();
  const handleLogout = () => {
    axiosClient
      .get(`/auth/logout`)
      .then(({ data }) => {
        localStorage.removeItem("decodedToken");
        setIsAuth(false);
        setCartItems([]);
        setQuantityInCart(0);
        setDecodedToken(null);
        navigate("/login");
      })
      .catch((error) => {
        console.log("Login Error", error.response.data.message);
      });
  };
  const location = useLocation();
  const home = {
    template: () => <Link to="/">Trang chủ</Link>,
  };
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);

  const generateBreadCrumb = () => {
    const path = location.pathname;
    const parts = path.split("/");
    let tmpArr = [];
    parts.forEach((part, index) => {
    
      if (part === "" && index === 1) {
      } else if (part !== "") {
        switch (part) {
          // case "": {
          //   tmpArr.push({ label: "Trang chủ", template: () => <Link to="/">Trang chủ</Link> });
          //   break;
          // }
          case "cart": {
            tmpArr.push({ label: "Giỏ hàng" });
            break;
          }
          case "login": {
            tmpArr.push({ label: "Đăng nhập" });
            break;
          }
          case "forgot": {
            tmpArr.push({ label: "Quên mật khẩu" });
            break;
          }
          case "otp": {
            tmpArr.push({ label: "Nhập OTP" });
            break;
          }
          case "reset": {
            tmpArr.push({ label: "Đổi mật khẩu" });
            break;
          }
          case "account": {
            tmpArr.push({
              label: "Tài khoản",
              template: () => <Link to="/account">Tài khoản</Link>,
            });
            break;
          }
          case "orders": {
            tmpArr.push({ label: "Đơn hàng" });
            break;
          }
          case "changepass": {
            tmpArr.push({ label: "Đổi mật khẩu" });
            break;
          }
          case "address": {
            tmpArr.push({ label: "Sổ địa chỉ" });
            break;
          }
          case "chainstore": {
            tmpArr.push({ label: "Hệ thống cửa hàng" });
            break;
          }
          case "checkout": {
            tmpArr.push({ label: "Thanh toán" });
            break;
          }
          case "contact-support": {
            tmpArr.push({ label: "Liên hệ và hỗ trợ" });
            break;
          }
          case "blogs": {
            tmpArr.push({ label: "Tin tức" });
            break;
          }
          case "inquiries-support": {
            tmpArr.push({ label: "Giải đáp thắc mắc" });
            break;
          }
          case "exchange-support": {
            tmpArr.push({ label: "Hướng dẫn đổi trả" });
            break;
          }
          case "size-support": {
            tmpArr.push({ label: "Hướng dẫn chọn size" });
            break;
          }
          case "payment-support": {
            tmpArr.push({ label: "Hướng dẫn thanh toán" });
            break;
          }
          case "collab-support": {
            tmpArr.push({ label: "Chương trình cộng tác viên" });
            break;
          }
          case "advice-support": {
            tmpArr.push({ label: "Tư vấn bán sỉ" });
            break;
          }
          case "gift-support": {
            tmpArr.push({ label: "Quà tặng tri ân" });
            break;
          }
          case "collab-policies": {
            tmpArr.push({ label: "Chính sách cộng tác viên" });
            break;
          }
          case "exchange-policies": {
            tmpArr.push({ label: "Chính sách đổi trả" });
            break;
          }
          case "membership-policies": {
            tmpArr.push({ label: "Chính sách thành viên" });
            break;
          }
          case "payment-policies": {
            tmpArr.push({ label: "Chính sách thanh toán" });
            break;
          }
          case "purchase-policies": {
            tmpArr.push({ label: "Hướng dẫn mua hàng" });
            break;
          }
          case "security-policies": {
            tmpArr.push({ label: "Bảo mật thông tin cá nhân" });
            break;
          }
          case "stock-policies": {
            tmpArr.push({ label: "Nhập hàng giá sỉ" });
            break;
          }
          case "register": {
            tmpArr.push({ label: "Đăng ký" });
            break;
          }
          case "products": {
            tmpArr.push({ label: "Tất cả sản phẩm" });
            break;
          }
          case "detail": {
            tmpArr.push({ label: "Chi tiết sản phẩm" });
            break;
          }
          case "order-detail": {
            tmpArr.push({ label: "Chi tiết đơn hàng" });
            break;
          }
          case "register": {
            tmpArr.push({ label: "Hỗ trợ" });
            break;
          }
          case "blog":{
            tmpArr.push({ label: "Chi tiết bài viết" });
            break;
          }
        }
      }
    });
    setBreadCrumbItems(tmpArr);
  };

  useEffect(() => {
    generateBreadCrumb();
  }, [location.pathname]);

  return (
    <div className={cx("container")}>
      <header className={cx("header")}>
        <div className={cx("header__nav-action")}>
          <div
            className={cx("header__nav-list")}
            onClick={() => setShowModal(true)}
          >
            <RxHamburgerMenu className={cx("header__nav-icon")} />
          </div>
          <div className={cx("header__nav-action")}>
            <GoSearch
              className={cx("header__nav-icon")}
              onClick={() =>
                setSearchVisible((prevSearchVisible) => !prevSearchVisible)
              }
            />
          </div>
        </div>
        <div className={cx("header__logo")}>
          <Link to="/">
            <img
              className={cx("header__img")}
              src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/logo.png?1706504358658"
              alt="logo"
            />
          </Link>
        </div>
        <div className={cx("header__navbar")}>
          <div className={cx("header__top")}>
            <div className={cx("header__hotline")}>
              <LiaPhoneSolid className={cx("header__icon")} />
              <div className={cx("header__phone")}>
                <span>Hotline: </span>
                <Link to="tel:1900 675">1900 6750</Link>
              </div>
            </div>
            <div className={cx("header__location", "space-right")}>
              <CiLocationOn className={cx("header__icon")} />
              <span className={cx("header__listlocation")}>
                <Link to="/chainstore">Hệ thống cửa hàng</Link>
              </span>
            </div>

            <Search />
          </div>
          <ul className={cx("header__bot")}>
            <li className={cx("header__bot-item")}>
              <Link to="/" className={cx("nav-link")}>
                Trang chủ
              </Link>
            </li>
            <li className={cx("header__bot-item", "has-mega")}>
              <Link to={"/products?keyword=nữ"} className={cx("nav-link")}>
                Nữ
                <IoChevronDownSharp className={cx("icon-down")} />
              </Link>
              <div className={cx("mega-content")}>
                <div className={cx("row")}>
                  <div className={cx("flex-25", "mega-banner")}>
                    <Link
                      to={"/products?keyword=nữ"}
                      className={cx("banner-effect")}
                      title="Nữ"
                    >
                      <img
                        className={cx("lazyload", "img-responsive", "loaded")}
                        src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/mega-1-image-1.jpg?1706504358658"
                        alt="Nữ"
                      />
                    </Link>
                  </div>
                  <div className={cx("flex-75", "mega-menu-list")}>
                    <ul className={cx("level0", "half-banner")}>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=áo nữ"}
                          title="Áo"
                        >
                          Áo
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo len nữ"}
                              title="Áo Len"
                            >
                              Áo Len
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo thun nữ"}
                              title="Áo Thun"
                            >
                              Áo Thun
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo sơ mi nữ"}
                              title="Áo Sơ Mi"
                            >
                              Áo Sơ Mi
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo cardigan nữ"}
                              title="Áo Cardigan"
                            >
                              Áo Cardigan
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=quần nữ"}
                          title="Quần"
                        >
                          Quần
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần tây nữ"}
                              title="Quần Tây Nữ"
                            >
                              Quần Tây Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần jean nữ"}
                              title="Quần Jean Nữ"
                            >
                              Quần Jean Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần short nữ"}
                              title="Quần Short Nữ"
                            >
                              Quần Short Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần leggings nữ"}
                              title="Quần Leggings Nữ"
                            >
                              Quần Leggings Nữ
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=váy nữ"}
                          title="Váy"
                        >
                          Váy
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=chân váy nữ"}
                              title="Chân Váy Nữ"
                            >
                              Chân Váy Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần váy nữ"}
                              title="Quần Váy Nữ"
                            >
                              Quần Váy Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=váy ngắn nữ"}
                              title="Váy Ngắn Nữ"
                            >
                              Váy Ngắn Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=váy liền thân nữ"}
                              title="Váy Liền Thân"
                            >
                              Váy Liền Thân
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đồ mặc trong nữ"}
                          title="Đồ Mặc Trong"
                        >
                          Đồ Mặc Trong
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo bra tops nữ"}
                              title="Áo Bra Tops"
                            >
                              Áo Bra Tops
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần tất lưới nữ"}
                              title="Quần Tất Lưới"
                            >
                              Quần Tất Lưới
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần con nữ"}
                              title="Quần Con Size Lớn"
                            >
                              Quần Con Size Lớn
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=ao nguc khong gong nữ"}
                              title="Áo Ngực Không Gọng"
                            >
                              Áo Ngực Không Gọng
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đồ mặc nhà nữ"}
                          title="Đồ Mặc Nhà"
                        >
                          Đồ Mặc Nhà
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ pyjama nữ"}
                              title="Đồ Pyjama Nữ"
                            >
                              Đồ Pyjama Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ relaco nữ"}
                              title="Đồ Relaco"
                            >
                              Đồ Relaco
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=bộ giường ngủ nữ"}
                              title="Bộ Giường Ngủ"
                            >
                              Bộ Giường Ngủ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=dép đi trong nhà nữ"}
                              title="Dép Đi Trong Nhà"
                            >
                              Dép Đi Trong Nhà
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=phụ kiện nữ"}
                          title="Phụ Kiện"
                        >
                          Phụ Kiện
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=túi xách nữ"}
                              title="Túi Xách Nữ"
                            >
                              Túi Xách Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồng hồ nữ"}
                              title="Đồng Hồ Nữ"
                            >
                              Đồng Hồ Nữ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=bông tai nữ"}
                              title="Bông Tai Nữ"
                            >
                              Bông Tai Nữ
                            </Link>
                          </li>
                        
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đầm nữ"}
                          title="Đầm "
                        >
                          Đầm
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đầm dạ hội nữ"}
                              title="Đầm Dạ Hội"
                            >
                              Đầm Dạ Hội
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đầm xoè trễ vai"}
                              title="Đầm Xòe Trễ Vai"
                            >
                              Đầm Xòe Trễ Vai
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đầm và jumpsuit nữ"}
                              title="Đầm Và Jumpsuit"
                            >
                              Đầm Và Jumpsuit
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đồ bộ nữ"}
                          title="Đồ Bộ Nữ"
                        >
                          Đồ Bộ Nữ
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ bộ mặc nhà nữ"}
                              title="Đồ Bộ Mặc Nhà"
                            >
                              Đồ Bộ Mặc Nhà
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ bộ đi chơi nữ"}
                              title="Đồ Bộ Đi Chơi"
                            >
                              Đồ Bộ Đi Chơi
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className={cx("header__bot-item", "has-mega")}>
              <Link to={"/products?keyword=nam"} className={cx("nav-link")}>
                Nam
                <IoChevronDownSharp className={cx("icon-down")} />
              </Link>
              <div className={cx("mega-content")}>
                <div className={cx("row")}>
                  <div className={cx("flex-25", "mega-banner")}>
                    <Link
                      to={"/products?keyword=nam"}
                      className={cx("banner-effect")}
                      title="Nam"
                    >
                      <img
                        className={cx("lazyload", "img-responsive", "loaded")}
                        src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/mega-2-image-1.jpg?1706504358658"
                        alt="Nam"
                      />
                    </Link>
                  </div>
                  <div className={cx("flex-50", "mega-menu-list")}>
                    <ul className={cx("level0")}>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=áo nam"}
                          title="Áo"
                        >
                          Áo
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo thun nam"}
                              title="Áo thun"
                            >
                              Áo thun
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo polo"}
                              title="Áo Polo"
                            >
                              Áo Polo
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo sơ mi nam"}
                              title="Áo Sơ Mi"
                            >
                              Áo Sơ Mi
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo ba lỗ nam"}
                              title="Áo ba lỗ"
                            >
                              Áo ba lỗ
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=quần nam"}
                          title="Quần"
                        >
                          Quần
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần tây nam"}
                              title="Quần Tây Nữ"
                            >
                              Quần Tây
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần kaki nam"}
                              title="Quần Jean Nữ"
                            >
                              Quần kaki
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần short nam"}
                              title="Quần Short Nữ"
                            >
                              Quần Short
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần thể thao nam"}
                              title="Quần Leggings Nữ"
                            >
                              Quần thể thao
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đồ mặc ngoài nam"}
                          title="đồ mặc ngoài"
                        >
                          Đồ mặc ngoài
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo khoác coat nam"}
                              title="Chân Váy Nữ"
                            >
                              Áo khoác(coat)
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo khoác jacket nam"}
                              title="Quần Váy Nữ"
                            >
                              Áo khoác(jacket)
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo blouson hooide nam"}
                              title="Váy Ngắn Nữ"
                            >
                              Áo blouson & hoodie
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo khoác siêu nhẹ nam"}
                              title="Váy Liền Thân"
                            >
                              Áo khoác siêu nhẹ
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đồ mặc trong nam"}
                          title="Đồ Mặc Trong"
                        >
                          Đồ Mặc Trong
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ lót nam"}
                              title="Áo Bra Tops"
                            >
                              Đồ lót
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo mặc trong nam"}
                              title="Quần Tất Lưới"
                            >
                              Áo mặc trong
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={
                                "/products?keyword=quần leggings quần tất nam"
                              }
                              title="Quần Con Size Lớn"
                            >
                              Quần leggings và quần tất
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đồ mặc nhà nam"}
                          title="Đồ Mặc Nhà"
                        >
                          Đồ Mặc Nhà
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ pyjama nam"}
                              title="Đồ Pyjama Nữ"
                            >
                              Đồ Pyjama
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần chino nam"}
                              title="Đồ Relaco"
                            >
                              Quần chino
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần dài đến mắc cá nam"}
                              title="Bộ Giường Ngủ"
                            >
                              Quần dài dến mắc cá
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=phụ kiện nam"}
                          title="Phụ Kiện"
                        >
                          Phụ Kiện
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=ví bóp nam"}
                              title="Túi Xách Nữ"
                            >
                              Ví - bóp
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=mắt kính nam"}
                              title="Đồng Hồ Nữ"
                            >
                              Mắt kính
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=vòng tay nam"}
                              title="Bông Tai Nữ"
                            >
                              Vòng tay
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className={cx("flex-25", "mega-banner")}>
                    <Link
                      to={"/products?keyword=trẻ em"}
                      className={cx("banner-effect")}
                      title="Nam"
                    >
                      <img
                        className={cx("lazyload", "img-responsive", "loaded")}
                        src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/mega-2-image-1.jpg?1706504358658"
                        alt="Nam"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li className={cx("header__bot-item", "has-mega")}>
              <Link to={"/products?keyword=trẻ em"} className={cx("nav-link")}>
                Trẻ em
                <IoChevronDownSharp className={cx("icon-down")} />
              </Link>
              <div className={cx("mega-content")}>
                <div className={cx("row")}>
                  <div className={cx("flex-25", "mega-banner")}>
                    <Link
                      to={"/products?keyword=trẻ em"}
                      className={cx("banner-effect")}
                      title="Trẻ em"
                    >
                      <img
                        className={cx("lazyload", "img-responsive", "loaded")}
                        src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/mega-3-image-2.jpg?1706504358658"
                        alt="Trẻ em"
                      />
                    </Link>
                  </div>
                  <div className={cx("flex-50", "mega-menu-list")}>
                    <ul className={cx("level0", "half-banner")}>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=áo trẻ em"}
                          title="Áo"
                        >
                          Áo
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo thun trẻ em"}
                              title="Áo Len"
                            >
                              Áo thun
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo sơ mi trẻ em"}
                              title="Áo Thun"
                            >
                              áo sơ mi
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo kiểu hoạ tiết trẻ em"}
                              title="Áo Sơ Mi"
                            >
                              áo kiểu hoạ tiết
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo hoạt hình trẻ em"}
                              title="Áo Sơ Mi"
                            >
                              áo hoạt hình
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=quần trẻ em"}
                          title="Quần"
                        >
                          Quần
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần dài trẻ em"}
                              title="Quần Tây Nữ"
                            >
                              Quần dài
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần short trẻ em"}
                              title="Quần Jean Nữ"
                            >
                              Quần short
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đầm xoè trẻ em"}
                              title="Quần Short Nữ"
                            >
                              Đầm xoè
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=chân váy trẻ em"}
                              title="Quần Leggings Nữ"
                            >
                              Chân váy
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=đồ lót trẻ em"}
                          title="Váy"
                        >
                          Đồ lót trẻ em
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo lót trẻ em"}
                              title="Chân Váy Nữ"
                            >
                              Áo lót
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần lót trẻ em"}
                              title="Quần Váy Nữ"
                            >
                              Quần lót
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={
                                "/products?keyword=áo mặc trong cài trước trẻ em"
                              }
                              title="Váy Ngắn Nữ"
                            >
                              áo mặc trong cài trước
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo khoác siêu nhẹ trẻ em"}
                              title="Váy Liền Thân"
                            >
                              áo khoác siêu nhẹ
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=phụ kiện trẻ em"}
                          title="Đồ Mặc Trong"
                        >
                          Phụ kiện trẻ em
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=kính mắt trẻ em"}
                              title="Áo Bra Tops"
                            >
                              kính mắt
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=khẩu trang trẻ em"}
                              title="Quần Tất Lưới"
                            >
                              khẩu trang
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=túi đeo trẻ em"}
                              title="Quần Con Size Lớn"
                            >
                              túi đeo
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              t
                              to={"/products?keyword=nón bảo hiểm trẻ em"}
                              title="Áo Ngực Không Gọng"
                            >
                              nón bảo hiểm
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className={cx("flex-25", "mega-banner")}>
                    <Link to="" className={cx("banner-effect")} title="Trẻ em">
                      <img
                        className={cx("lazyload", "img-responsive", "loaded")}
                        src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/mega-3-image-2.jpg?1706504358658"
                        alt="Trẻ em"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            <li className={cx("header__bot-item", "has-mega")}>
              <Link to="/products" className={cx("nav-link")}>
                Sản phẩm
                <IoChevronDownSharp className={cx("icon-down")} />
              </Link>
              <div className={cx("mega-content")}>
                <div className={cx("row")}>
                  <div className={cx("flex-25", "mega-banner")}>
                    <Link
                      to="/products"
                      className={cx("banner-effect")}
                      title="Nữ"
                    >
                      <img
                        className={cx("lazyload", "img-responsive", "loaded")}
                        src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/mega-4-image-1.jpg?1706504358658"
                        alt="Nữ"
                      />
                    </Link>
                  </div>
                  <div className={cx("flex-75", "mega-menu-list")}>
                    <ul className={cx("level0", "half-banner")}>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=nam"}
                          title="Áo"
                        >
                          thời trang nam
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo thun nam"}
                              title="Áo Len"
                            >
                              Áo thun
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo sơ mi nam"}
                              title="Áo Thun"
                            >
                              Áo sơ mi
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần jeans nam"}
                              title="Áo Sơ Mi"
                            >
                              Quần jeans
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ thể thao nam"}
                              title="Áo Cardigan"
                            >
                              đồ thể thao
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=nữ"}
                          title="Quần"
                        >
                          Thời trang nữ
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đầm nữ"}
                              title="Quần Tây Nữ"
                            >
                              Đầm
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=váy nữ"}
                              title="Quần Jean Nữ"
                            >
                              Váy
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ bộ nữ"}
                              title="Quần Short Nữ"
                            >
                              Đồ bộ
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ ngủ nữ"}
                              title="Quần Leggings Nữ"
                            >
                              Đồ ngủ
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=trẻ em"}
                          title="Váy"
                        >
                          Thời trang trẻ em
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ sơ sinh"}
                              title="Chân Váy Nữ"
                            >
                              Đồ sơ sinh
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ bé trai"}
                              title="Quần Váy Nữ"
                            >
                              đồ bé trai
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ bé gái"}
                              title="Váy Ngắn Nữ"
                            >
                              đồ bé gái
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li
                        className={cx("level1", "parent", "item", "fix-navs")}
                      >
                        <Link
                          className={cx("hmega")}
                          to={"/products?keyword=gym"}
                          title="Đồ Mặc Trong"
                        >
                          thời trang tập gym
                        </Link>
                        <ul className={cx("level1")}>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=áo tập gym"}
                              title="Áo Bra Tops"
                            >
                              áo tập gym
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=quần tập gym"}
                              title="Quần Tất Lưới"
                            >
                              Quần tập gym
                            </Link>
                          </li>
                          <li className={cx("level2")}>
                            <Link
                              to={"/products?keyword=đồ bộ tập gym"}
                              title="Quần Con Size Lớn"
                            >
                              Đồ bộ tập gym
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className={cx("header__bot-item")}>
              <Link to="/blogs" className={cx("nav-link")}>
                Tin tức
              </Link>
            </li>
            <li className={cx("header__bot-item")}>
              <Link to="/contact-support" className={cx("nav-link")}>
                Liên hệ
              </Link>
            </li>
            <li className={cx("header__bot-item")}>
              <Link href="#" className={cx("nav-link")}>
                <FaGift color="red" />
                <span className={cx("text")}>Khuyến mãi</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={cx("header__action")}>
          <div
            className={cx("header__action-item", "header__action-item-auth")}
          >
            <span className={cx("box-icon")}>
              <SlUser className={cx("header__action-icon")} />
            </span>
            <div className={cx("action-title")}>Tài khoản</div>
            <ul className={cx("list-auth-action")}>
              {isAuth == false ? (
                <>
                  <li className={cx("item-auth-action")}>
                    <Link to="/login">
                      <SlLogin />
                      <span>Đăng nhập</span>
                    </Link>
                  </li>
                  <li className={cx("item-auth-action")}>
                    <Link to="/register">
                      <PiUserPlus />
                      <span>Đăng ký</span>
                    </Link>
                  </li>{" "}
                </>
              ) : (
                <>
                  <li className={cx("item-auth-action")}>
                    <Link to="/account">
                      <PiUser />
                      <span>Tài khoản</span>
                    </Link>
                  </li>
                  <li
                    onClick={() => handleLogout()}
                    className={cx("item-auth-action", "logout")}
                  >
                    <Link to="/login">
                      <SlLogout color="#fff" />
                      <span className={cx("logoutTxt")}>Đăng xuất</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/cart" className={cx("header__action-item")}>
            <span className={cx("box-icon")}>
              <HiOutlineShoppingBag className={cx("header__action-icon")} />
            </span>
            <div className={cx("action-title")}>Giỏ hàng</div>
            <span className={cx("cart-count")}>{quantityInCart}</span>
          </Link>
        </div>
      </header>
      {searchVisible && (
        <div className={cx("header__search-action")}>
          <Search />
        </div>
      )}

      <div className={cx("breadCrumbFullWidth")}>
        <div className={cx("breadCrumb")}>
          {location.pathname === "/" ? null : (
            <BreadCrumb
              model={breadCrumbItems ? breadCrumbItems : []}
              home={home}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
