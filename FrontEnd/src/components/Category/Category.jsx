import React, { useState } from "react";
import style from "./Category.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);

const data = [
  {
    index: 1,
    name: "Nữ",
    link: "/ao-len",
    subcategories: [
      {
        index: 1,
        name: "Áo",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Áo Len",
            link: "/ao-len",
            subcategories: [],
          },
          {
            index: 2,
            name: "Áo Thun",
            link: "/ao-thun",
            subcategories: [],
          },
          {
            index: 3,
            name: "Áo Sơ Mi",
            link: "/ao-so-mi",
            subcategories: [],
          },
          {
            index: 4,
            name: "Áo Cardigan",
            link: "/ao-cardigan",
            subcategories: [],
          },
        ],
      },
      {
        index: 2,
        name: "Quần",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Quần Tây Nữ",
            link: "/quan-tay-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Jean Nữ",
            link: "/quan-jean-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Short Nữ",
            link: "/quan-short-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Leggings Nữ",
            link: "/quan-leggings-nu",
            subcategories: [],
          },
        ],
      },
      {
        index: 3,
        name: "Váy",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Chân Váy Nữ",
            link: "/chan-vay-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Váy Nữ",
            link: "/quan-vay-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Váy Ngắn Nữ",
            link: "/vay-ngan-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Váy Liền Thân",
            link: "/vay-lien-than",
            subcategories: [],
          },
        ],
      },
      {
        index: 4,
        name: "Đồ Mặc Trong",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Áo Bra Tops",
            link: "/ao-bra-tops",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Tất Lưới",
            link: "/quan-tat-luoi",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Con Size Lớn",
            link: "/quan-con-size-lon",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Ngực Không Gọng",
            link: "/ao-nguc-khong-gong",
            subcategories: [],
          },
        ],
      },
      {
        index: 5,
        name: "Đồ Mặc Nhà",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Đồ Pyjama Nữ",
            link: "/do-pyjama-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Đồ Relaco",
            link: "/do-relaco",
            subcategories: [],
          },
          {
            index: 1,
            name: "Bộ Giường Ngủ",
            link: "/bo-giuong-ngu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Dép Đi Trong Nhà",
            link: "/dep-di-trong-nha",
            subcategories: [],
          },
        ],
      },
      {
        index: 6,
        name: "Phụ Kiện",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Túi Xách Nữ",
            link: "/tui-xach-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Đồng Hồ Nữ",
            link: "/dong-ho-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Bông Tai Nữ",
            link: "/bong-tai-nu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Tất Cả Phụ Kiện",
            link: "/tat-ca-phu-kien",
            subcategories: [],
          },
        ],
      },
      {
        index: 7,
        name: "Đầm Và Jumpsuit",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Đầm Dạ Hội",
            link: "/dam-da-hoi",
            subcategories: [],
          },
          {
            index: 1,
            name: "Đầm Xòe Trễ Vai",
            link: "/dam-xoe-tre-vai",
            subcategories: [],
          },
          {
            index: 1,
            name: "Đầm Và Jumpsuit",
            link: "/dam-va-jumpsuit",
            subcategories: [],
          },
        ],
      },
      {
        index: 8,
        name: "Đồ Bộ Nữ",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Đồ Bộ Mặc Nhà",
            link: "/do-bo-mac-nha",
            subcategories: [],
          },
          {
            index: 1,
            name: "Đồ Bộ Đi Chơi",
            link: "/do-bo-di-choi",
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    index: 2,
    name: "Nam",
    link: "/ao-len",
    subcategories: [
      {
        index: 1,
        name: "Áo",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Áo Thun",
            link: "/ao-thun",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Polo",
            link: "/ao-polo",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Sơ Mi",
            link: "/ao-so-mi",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Ba Lỗ",
            link: "/ao-ba-lo",
            subcategories: [],
          },
        ],
      },
      {
        index: 2,
        name: "Quần",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Quần Tây Nam",
            link: "/quan-tay-nam",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Kaki Nam",
            link: "/quan-kaki-nam",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Short Nam",
            link: "/quan-short-nam",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Thể Thao Nam",
            link: "/quan-the-thao-nam",
            subcategories: [],
          },
        ],
      },
      {
        index: 3,
        name: "Đồ Mặc Ngoài",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Áo Khoác (Coat)",
            link: "/ao-khoac-coat",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Khoác (Jacket)",
            link: "/ao-khoac-jacket",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Blouson & Hoodie",
            link: "/ao-blouson-hoodie",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Khoác Siêu Nhẹ",
            link: "/ao-khoac-sieu-nhe",
            subcategories: [],
          },
        ],
      },
      {
        index: 4,
        name: "Đồ Mặc Trong",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Đồ Lót",
            link: "/do-lot",
            subcategories: [],
          },
          {
            index: 1,
            name: "AIRism",
            link: "/airism",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Mặc Trong",
            link: "/ao-mac-trong",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Leggings Và Quần Tất",
            link: "/quan-leggings-va-quan-tat",
            subcategories: [],
          },
        ],
      },
      {
        index: 5,
        name: "Đồ Mặc Nhà",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Đồ Ngủ",
            link: "/do-ngu",
            subcategories: [],
          },
          {
            index: 1,
            name: "Đồ Pyjama",
            link: "/do-pyjama",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Chino",
            link: "/quan-chino",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Dài Đến Mắt Cá",
            link: "/quan-dai-den-mat-ca",
            subcategories: [],
          },
        ],
      },
      {
        index: 6,
        name: "Phụ Kiện Nam",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Ví - Bóp",
            link: "/vi-bop",
            subcategories: [],
          },
          {
            index: 1,
            name: "Mắt Kính",
            link: "/mat-kinh",
            subcategories: [],
          },
          {
            index: 1,
            name: "Vòng Tay",
            link: "/vong-tay",
            subcategories: [],
          },
          {
            index: 1,
            name: "Khẩu Trang AIRism",
            link: "/khau-trang-airism",
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    index: 3,
    name: "Trẻ Em",
    link: "/ao-len",
    subcategories: [
      {
        index: 1,
        name: "Áo Trẻ Em",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Áo Thun Trẻ Em",
            link: "/ao-thun-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Sơ Mi",
            link: "/ao-so-mi-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Kiểu Họa Tiết",
            link: "/ao-kieu-hoa-tiet",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Thun Hoạt Hình",
            link: "/ao-thun-hoat-hinh",
            subcategories: [],
          },
        ],
      },
      {
        index: 2,
        name: "Quần Trẻ Em",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Quần Dài",
            link: "/quan-dai-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Short",
            link: "/quan-short-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Đầm Xòe",
            link: "/dam-xoe-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Chân Váy",
            link: "/chan-vay-tre-em",
            subcategories: [],
          },
        ],
      },
      {
        index: 3,
        name: "Đồ Lót Trẻ Em",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Quần Short",
            link: "/quan-short-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Lót Trẻ Em",
            link: "/ao-lot-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Quần Lót Trẻ Em",
            link: "/quan-lot-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Áo Mặc Trong Cài Trước",
            link: "/ao-mac-trong-cai-truoc",
            subcategories: [],
          },
        ],
      },
      {
        index: 4,
        name: "Phụ Kiện Trẻ Em",
        link: "/ao-len",
        subcategories: [
          {
            index: 1,
            name: "Kính Mắt",
            link: "/kinh-mat-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Khẩu Trang",
            link: "/khau-trang-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Túi Đeo",
            link: "/tui-deo-tre-em",
            subcategories: [],
          },
          {
            index: 1,
            name: "Nón Bảo Hiểm",
            link: "/non-bao-hiem-tre-em",
            subcategories: [],
          },
        ],
      },
    ],
  },
  {
    index: 4,
    name: "Thời Trang Nam",
    link: "/ao-len",
    subcategories: [
      {
        index: 1,
        name: "Áo Thun",
        link: "/ao-thun-nam",
        subcategories: [],
      },
      {
        index: 2,
        name: "Áo Sơ Mi",
        link: "/ao-so-mi-nam",
        subcategories: [],
      },
      {
        index: 3,
        name: "Quần jeans",
        link: "/quan-jeans-nam",
        subcategories: [],
      },
      {
        index: 4,
        name: "Đồ thể thao",
        link: "/do-the-thao-nam",
        subcategories: [],
      },
    ],
  },
  {
    index: 5,
    name: "Thời Trang Nữ",
    link: "/ao-len",
    subcategories: [
      {
        index: 1,
        name: "Đầm",
        link: "/dam",
        subcategories: [],
      },
      {
        index: 2,
        name: "Váy",
        link: "/vay",
        subcategories: [],
      },
      {
        index: 3,
        name: "Đồ Bộ",
        link: "/do-bo",
        subcategories: [],
      },
      {
        index: 4,
        name: "Đồ Ngủ",
        link: "/do-ngu",
        subcategories: [],
      },
    ],
  },
  {
    index: 6,
    name: "Thời Trang Trẻ Em",
    link: "/ao-len",
    subcategories: [
      {
        index: 1,
        name: "Đồ Sơ Sinh",
        link: "/do-so-sinh",
        subcategories: [],
      },
      {
        index: 2,
        name: "Đồ Bé Trai",
        link: "/do-be-trai",
        subcategories: [],
      },
      {
        index: 3,
        name: "Đồ Bé Gái",
        link: "/do-be-gai",
        subcategories: [],
      },
    ],
  },
  {
    index: 7,
    name: "Thời Trang Tập Gym",
    link: "/ao-len",
    subcategories: [
      {
        index: 1,
        name: "Áo Tập Gym",
        link: "/ao-tap-gym",
        subcategories: [],
      },
      {
        index: 2,
        name: "Quần Tập Gym",
        link: "/quan-tap-gym",
        subcategories: [],
      },
      {
        index: 3,
        name: "Đồ Bộ Tập Gym",
        link: "/do-bo-tap-gym",
        subcategories: [],
      },
    ],
  },
];

export default function Category() {
  const [isVisible, setIsVisible] = useState(0);
  const toggleMenu = (index) => {
    setIsVisible(index);
  };
  const [isVisible2, setIsVisible2] = useState(0);
  const toggleMenu2 = (index) => {
    setIsVisible2(index);
  };
  return (
    <div className={cx("category-aside-content-blog")}>
      <div className={cx("title-head")}>Danh mục</div>
      <nav className={cx("nav-category")}>
        <ul className={cx("navbar-pills")}>
          {data.map((e) => (
            <li className={cx("nav-item", "relative", isVisible === e.index ? "showing-detail" : "not-show-detail")}>
              <div className={cx("category-title")}>
                <Link title={e.name} to={e.link} className={cx("nav-link", "pr-5")}>
                  {e.name}
                </Link>
                {isVisible === e.index ? (
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => {
                      toggleMenu(0);
                      toggleMenu2(0);
                    }}
                    className={cx("fa-icon", "fa-minus")}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => {
                      toggleMenu(e.index);
                      toggleMenu2(0);
                    }}
                    className={cx("fa-icon", "fa-plus")}
                  />
                )}
              </div>
              <ul className={cx("menu_down", `${isVisible === e.index ? `visible` : `hidden`}`)}>
                {e.subcategories.length > 0 &&
                  e.subcategories.map((e1) => (
                    <li className={cx("dropdown-submenu", "nav-item", "relative", isVisible === e.index && isVisible2 === e1.index ? "showing-detail" : "not-show-detail")}>
                      <div className={cx("category-title")}>
                        <Link title={e1.name} className={cx("nav-link", "pr-5")} to={e1.link}>
                          {e1.name}
                        </Link>

                        {isVisible === e.index && isVisible2 === e1.index && e1.subcategories.length > 0 ? (
                          <FontAwesomeIcon icon={faMinus} onClick={() => toggleMenu2(0)} className={cx("fa-icon", "fa-minus")} />
                        ) : e1.subcategories.length > 0 ? (
                          <FontAwesomeIcon icon={faPlus} onClick={() => toggleMenu2(e1.index)} className={cx("fa-icon", "fa-plus")} />
                        ) : (
                          <></>
                        )}
                      </div>
                      <ul className={cx("menu_down", `${isVisible === e.index && isVisible2 === e1.index ? `visible` : `hidden`}`)}>
                        {e1.subcategories.length > 0 &&
                          e1.subcategories.map((e2) => (
                            <li className={cx("nav-item")}>
                              <Link title={e2.name} className={cx("nav-link", "pl-4")} to={e2.link}>
                                {e2.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
