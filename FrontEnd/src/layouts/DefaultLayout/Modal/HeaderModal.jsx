import { Link } from "react-router-dom";

import { LuMinus, LuPlus, LuX } from "react-icons/lu";

import classNames from "classnames/bind";
import style from "./HeaderModal.module.scss";
import { useState } from "react";
const cx = classNames.bind(style);
function HeaderModal({ isShowModal,setShowModal }) {
  const [navlist, setNavList] = useState([
    {
      titleLv1: "Trang chủ",
      href: "/",
    },
    {
      titleLv1: "Nữ",
      iconOpen: LuPlus,
      isOpenLv2: false,
      navListLv2: [
        {
          titleLv2: "Áo",
          href: "/products/ao",
          iconOpen: LuPlus,
          isOpenLv3: false,
          navListLv3: [
            {
              titleLv3: "Áo len",
              href: "/products/ao-len",
            },
            {
              titleLv3: "Áo thun",
              href: "/products/ao-thun",
            },
            {
              titleLv3: "Áo sơ mi",
              href: "/products/ao-so-mi",
            },
            {
              titleLv3: "Áo cardigan",
              href: "/products/ao-cardigan",
            },
          ],
        },
        {
          titleLv2: "Quần",
          href: "/products/quan",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Quần Tây Nữ",
              href: "/products/quan-tay-nu",
            },
            {
              titleLv3: "Quần jean Nữ",
              href: "/products/quan-jean-nu",
            },
            {
              titleLv3: "Quần short Nữ",
              href: "/products/quan-short-nu",
            },
            {
              titleLv3: "Quần Leggings Nữ",
              href: "/products/quan-leggings-nu",
            },
          ],
        },
        {
          titleLv2: "váy",
          href: "/products/vay",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Chân Váy Nữ ",
              href: "/products/chan-vay-nu",
            },
            {
              titleLv3: "Quần Váy Nữ",
              href: "/products/quan-vay-nu",
            },
            {
              titleLv3: "Váy Ngắn Nữ",
              href: "/products/vay-ngan-nu",
            },
            {
              titleLv3: "Váy Liền Thân",
              href: "/products/vay-lien-nu",
            },
          ],
        },
        {
          titleLv2: "đồ mặc trong",
          href: "/products/do-mac-trong",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Áo Bra Tops",
              href: "/products/ao-bra-tops",
            },
            {
              titleLv3: "Quần Tất Lưới",
              href: "/products/quan-tat-luoi",
            },
            {
              titleLv3: "Quần Con Size Lớn",
              href: "/products/quan-con-size-lon",
            },
            {
              titleLv3: "Áo Ngực Không Gọng",
              href: "/products/ao-nguc-khong-gong",
            },
          ],
        },
        {
          titleLv2: "đồ mặc nhà",
          href: "/products/do-mac-nha",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Đồ Pyjama Nữ",
              href: "/products/do-pyjama-nu",
            },
            {
              titleLv3: "Đồ Relaco",
              href: "/products/do-relaco",
            },
            {
              titleLv3: "Bộ Giường Ngủ",
              href: "/products/bo-giuong-ngu",
            },
            {
              titleLv3: "Dép Đi Trong Nhà",
              href: "/products/dep-di-trong-nha",
            },
          ],
        },
        {
          titleLv2: "phụ kiện",
          href: "/products/phu-kien",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Túi Xách Nữ",
              href: "/products/tui-xach-nu",
            },
            {
              titleLv3: "Đồng Hồ Nữ",
              href: "/products/dong-ho-nu",
            },
            {
              titleLv3: "Bông Tai Nữ",
              href: "/products/bong-tai-nu",
            },
            {
              titleLv3: "Tất Cả Phụ Kiện",
              href: "/products/tat-ca-phu-kien",
            },
          ],
        },
        {
          titleLv2: "Đầm",
          href: "/products/dam",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Đầm Dạ Hội",
              href: "/products/dam-da-hoi",
            },
            {
              titleLv3: "Đầm Xòe Trễ Vai",
              href: "/products/dam-xoe-tre-vai",
            },
            {
              titleLv3: "Đầm Và Jumpsuit",
              href: "/products/dam-va-jumpsuit",
            },
          ],
        },
        {
          titleLv2: "Đồ bộ nữ",
          href: "/products/do-bo-nu",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Đồ Bộ Mặc Nhà",
              href: "/products/do-bo-mac-nha",
            },
            {
              titleLv3: "Đồ Bộ Đi Chơi",
              href: "/products/do-bo-di-choi",
            },
          ],
        },
      ],
    },
    {
      titleLv1: "Nam",
      iconOpen: LuPlus,

      navListLv2: [
        {
          titleLv2: "Áo",
          href: "/products/ao-nam",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Áo Thun",
              href: "/products/ao-thun-nam",
            },
            {
              titleLv3: "Áo Polo",
              href: "/products/ao-polo-nam",
            },
            {
              titleLv3: "Áo Sơ Mi",
              href: "/products/ao-so-mi-nam",
            },
            {
              titleLv3: "Áo Ba Lỗ",
              href: "/products/ao-ba-lo-nam",
            },
          ],
        },
        {
          titleLv2: "Quần",
          href: "/products/quan-nam",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Quần Tây Nam",
              href: "/products/quan-tay-nam",
            },
            {
              titleLv3: "Quần Kaki Nam",
              href: "/products/quan-kaki-nam",
            },
            {
              titleLv3: "Quần Short Nam",
              href: "/products/quan-short-nam",
            },
            {
              titleLv3: "Quần Thể Thao Nam",
              href: "/products/quan-the-thao-nam",
            },
          ],
        },
        {
          titleLv2: "Đồ Mặc Ngoài",
          href: "/products/do-mac-ngoai",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Áo Khoác (Coat)",
              href: "/products/ao-khoac-coat-nam",
            },
            {
              titleLv3: "Áo Khoác (Jacket)",
              href: "/products/ao-khoac-jacket-nam",
            },
            {
              titleLv3: "Áo Blouson & Hoodie",
              href: "/products/ao-blouson-va-hoodie",
            },
            {
              titleLv3: "Áo Khoác Siêu Nhẹ",
              href: "/products/ao-khoac-sieu-nhe",
            },
          ],
        },
        {
          titleLv2: "Đồ Mặc Trong ",
          href: "/products/do-mac-trong",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Đồ Lót",
              href: "/products/do-lot-nam",
            },
            {
              titleLv3: "AIRism",
              href: "/products/airism",
            },
            {
              titleLv3: "Áo Mặc Trong",
              href: "/products/ao-mac-trong",
            },
            {
              titleLv3: "Quần Leggings Và Quần Tất",
              href: "/products/quan-leggings-va-quan-tat",
            },
          ],
        },
        {
          titleLv2: "đồ mặc nhà",
          href: "/products/do-mac-nha",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Đồ Ngủ",
              href: "/products/do-ngu-nam",
            },
            {
              titleLv3: "Đồ Pyjama",
              href: "/products/do-pyjama-nam",
            },
            {
              titleLv3: "Quần Chino",
              href: "/products/quan-chino",
            },
            {
              titleLv3: "Quần Dài Đến Mắt Cá",
              href: "/products/quan-dai-den-mac-ca",
            },
          ],
        },
        {
          titleLv2: "phụ kiện",
          href: "/products/phu-kien-nam",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Ví - Bóp",
              href: "/products/vi-bop-nam",
            },
            {
              titleLv3: "Mắt Kính",
              href: "/products/mat-kinh-nam",
            },
            {
              titleLv3: "Vòng Tay",
              href: "/products/vong-tay-nam",
            },
            {
              titleLv3: "Khẩu Trang AIRism",
              href: "/products/khau-trang-airism",
            },
          ],
        },
      ],
    },
    {
      titleLv1: "Trẻ em",
      iconOpen: LuPlus,

      navListLv2: [
        {
          titleLv2: "Áo trẻ em",
          href: "/products/ao-tre-em",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Áo Thun trẻ em",
              href: "/products/ao-thun-tre-em",
            },
            {
              titleLv3: "Áo Sơ Mi",
              href: "/products/ao-so-mi-tre-em",
            },
            {
              titleLv3: "Áo Kiểu Họa Tiết",
              href: "/products/ao-kieu-hoa-tiet",
            },

            {
              titleLv3: "Áo Thun Hoạt Hình",
              href: "/products/ao-thun-hoat-hinh",
            },
          ],
        },
        {
          titleLv2: "Quần trẻ em",
          href: "/products/quan-tre-em",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Quần dài",
              href: "/products/quan-dai-tre-em",
            },
            {
              titleLv3: "Quần Short trẻ em",
              href: "/products/quan-short-tre-em",
            },
            {
              titleLv3: "Đầm Xòe",
              href: "/products/dam-xoe-tre-em",
            },

            {
              titleLv3: "Chân Váy",
              href: "/products/chan-vay-tre-em",
            },
          ],
        },
        {
          titleLv2: "Đồ Lót Trẻ Em",
          href: "/products/do-lot-tre-em",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Áo Lót Trẻ Em",
              href: "/products/ao-loat-tre-em",
            },
            {
              titleLv3: "Quần Lót Trẻ Em",
              href: "/products/quan-lot-tre-em",
            },
            {
              titleLv3: "Áo Mặc Trong Cài Trước",
              href: "/products/ao-mac-trong-cai-truoc",
            },
            {
              titleLv3: "Áo Khoác Siêu Nhẹ",
              href: "/products/ao-khoac-sieu-nhe",
            },
          ],
        },
        {
          titleLv2: "Phụ kiện trẻ em",
          href: "/products/phu-kien-tre-em",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Kính Mắt",
              href: "/products/kinh-mat",
            },
            {
              titleLv3: "Khẩu Trang",
              href: "/products/khau-trang",
            },
            {
              titleLv3: "Túi Đeo",
              href: "/products/tui-deo",
            },
            {
              titleLv3: "Nón Bảo Hiểm",
              href: "/products/non-bao-hiem",
            },
          ],
        },
      ],
    },
    {
      titleLv1: "Sản phẩm",
      iconOpen: LuPlus,

      navListLv2: [
        {
          titleLv2: "Thời Trang Nam",
          href: "/products/thoi-trang-nam",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Áo Thun",
              href: "/products/ao-thun-nam",
            },
            {
              titleLv3: "Áo Sơ Mi",
              href: "/products/ao-so-mi-nam",
            },
            {
              titleLv3: "Quần jeans",
              href: "/products/quan-jeans-nam",
            },

            {
              titleLv3: "Đồ thể thao",
              href: "/products/do-the-thao-nam",
            },
          ],
        },
        {
          titleLv2: "Thời trang nữ",
          href: "/products/thoi-trang-nu",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Đầm",
              href: "/products/dam-nu",
            },
            {
              titleLv3: "Váy",
              href: "/products/vay-nu",
            },
            {
              titleLv3: "Đồ bộ",
              href: "/products/do-bo-nu",
            },

            {
              titleLv3: "Đồ ngủ",
              href: "/products/do-ngu-nu",
            },
          ],
        },
        {
          titleLv2: "thời trang Trẻ Em",
          href: "/products/thoi-trang-tre-em",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Đồ Sơ Sinh",
              href: "/products/do-so-sinh",
            },
            {
              titleLv3: "Đồ Bé Trai",
              href: "/products/do-be-trai",
            },
            {
              titleLv3: "Đồ Bé Gái",
              href: "/products/do-be-gai",
            },
          ],
        },
        {
          titleLv2: "Thời Trang Tập Gym",
          href: "/products/thoi-trang-gym",
          iconOpen: LuPlus,

          navListLv3: [
            {
              titleLv3: "Áo Tập Gym",
              href: "/products/ao-tap-gym",
            },
            {
              titleLv3: "Quần Tập Gym",
              href: "/products/quan-tap-gym",
            },
            {
              titleLv3: "Đồ Bộ Tập Gym",
              href: "/products/do-bo-gym",
            },
          ],
        },
      ],
    },
    {
      titleLv1: "Tin tức",
      href: "/blogs",
    },
    {
      titleLv1: "Liên hệ",
      href: "/contact-support",
    },
  ]);
  const handleShowDropDownLv2 = (index) => {
    setNavList((prevNavList) =>
      prevNavList.map((navItemLv1, idx) => {
        if (idx === index) {
          return {
            ...navItemLv1,
            iconOpen: navItemLv1.isOpenLv2 ? LuPlus : LuMinus,
            isOpenLv2: !navItemLv1.isOpenLv2,
          };
        } else {
          return navItemLv1;
        }
      })
    );
  };
  const handleShowDropDownLv3 = (indexLv1, indexLv2) => {
    setNavList((prevNavList) =>
      prevNavList.map((navItemLv1, idxLv1) => {
        if (indexLv1 === idxLv1) {
          return {
            ...navItemLv1,
            navListLv2: navItemLv1.navListLv2.map((navItemLv2, idxLv2) => {
              if (indexLv2 === idxLv2) {
                return {
                  ...navItemLv2,
                  iconOpen: navItemLv2.isOpenLv3 ? LuPlus : LuMinus,
                  isOpenLv3: !navItemLv2.isOpenLv3,
                };
              } else {
                return navItemLv2;
              }
            }),
          };
        } else {
          return navItemLv1;
        }
      })
    );
  };

  return (
    <div className={cx("header__nav-modal-container", isShowModal ? "SlideInRight" : "SildeInLeft")}>
      <div className={cx("header__nav-modal")}>
        <div className={cx("header__nav-list-container")}>
          <h3 className={cx("header__nav-list-title")}>DANH MỤC SẢN PHẨM</h3>
          <LuX
            className={cx("header__nav-icon-close")}
            onClick={() => setShowModal(false)}
          />
        </div>
        <ul className={cx("header__nav-list")}>
          {navlist.map((navItemLv1, indexLv1) => {
            if (navItemLv1?.navListLv2) {
              let IconOpen = navItemLv1.iconOpen;
              return (
                <li className={cx("header__nav-item")} key={indexLv1}>
                  <div className={cx("header__nav-item-action")}>
                    <Link to={`/products?keyword=${navItemLv1.titleLv1}`}
                    onClick={() => setShowModal(false)}
                    >{navItemLv1.titleLv1}</Link>
                    {/* <LuMinus className={cx("header__nav-icon")}/> */}
                    <IconOpen
                      className={cx("header__nav-icon")}
                      onClick={() => handleShowDropDownLv2(indexLv1)}
                    />
                  </div>
                  <ul
                    className={cx(
                      "header__nav-list-lv2",
                      navItemLv1.isOpenLv2 ? "show_dropdown_lv2" : ""
                    )}
                  >
                    {navItemLv1.navListLv2.map((navItemLv2, indexLv2) => {
                      let IconOpen = navItemLv2.iconOpen;
                      return (
                        <li className={cx("header__nav-item-lv2")} key={indexLv2}>
                          <div className={cx("header__nav-item-action")}>
                            <Link to={`/products?keyword=${navItemLv2.titleLv2}`}   onClick={() => setShowModal(false)}>
                              {navItemLv2.titleLv2}
                            </Link>
                            {/* <LuMinus className={cx("header__nav-icon")}/> */}
                            <IconOpen
                              className={cx("header__nav-icon")}
                              onClick={() =>
                                handleShowDropDownLv3(indexLv1, indexLv2)
                              }
                            />
                          </div>
                          <ul
                            className={cx(
                              "header__nav-list-lv3",
                              navItemLv2.isOpenLv3 ? "show_dropdown_lv3" : ""
                            )}
                          >
                            {navItemLv2.navListLv3.map((navItemLv3, index) => (
                              <li className={cx("header__nav-item-lv3")} key={index}>
                                <Link to={`/products?keyword=${navItemLv3.titleLv3}`}   onClick={() => setShowModal(false)}>
                                  {navItemLv3.titleLv3}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            } else {
              return (
                <li className={cx("header__nav-item")}>
                  <Link to="/">{navItemLv1.titleLv1}</Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default HeaderModal;
