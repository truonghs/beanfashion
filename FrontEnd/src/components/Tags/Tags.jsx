import React from "react";
import style from "./Tag.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

export default function Tags() {
  return (
    <div className={cx("blog_tags")}>
      <div className={cx("title-head")}>Tags</div>
      <ul className={cx("list-tags")}>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/anna-zhou" title="Anna Zhou">
            Anna Zhou
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/denim" title="Denim">
            Denim
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/duong-pho" title="Đường phố">
            Đường phố
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/mua-thu-2022" title="Mùa thu 2022">
            Mùa thu 2022
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/nam-2022" title="Năm 2022">
            Năm 2022
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/nha-thiet-ke" title="Nhà thiết kế">
            Nhà thiết kế
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/phong-cach" title="Phong cách">
            Phong cách
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/quan-au" title="Quần âu">
            Quần âu
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/thoi-trang" title="Thời trang">
            Thời trang
          </Link>
        </li>
        <li className={cx("item_tag")}>
          <Link to="/tin-tuc/thoi-trang-nu" title="Thời trang nữ">
            Thời trang nữ
          </Link>
        </li>
      </ul>
    </div>
  );
}
