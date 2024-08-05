import React from "react";
import style from "./NewsCard.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

const data = [
  {
    title: "Nhà thiết kế vĩ đại đầu tiên của năm 2022",
    href: "/nha-thiet-ke-vi-dai-dau-tien-cua-nam-2022",
    postTime: "05/04/2022",
    description:
      "Đó là buổi trình diễn lớn đầu tiên của Tuần lễ thời trang Milan: 1 giờ chiều ngày 1. Mọi chiếc ghế trong không gian nhà kho hang động, nơi được&nbsp;trang trí bằng những chiếc vỏ bom bằng vải denim bơm hơi khổng lồ và những con khỉ mỡ&nbsp;, đều đã đầy ắp.&nbsp;Một số người tham dự dường như đã đến thẳng từ sân bay.&nbsp;Tim Blanks, nhà phê bình của Business of Fashion, đã có mặt tại buổi trình diễn “lần...",
    imgSrc: require("../../assets/image/news_Img.webp"),
  },
  {
    title: "Nhà thiết kế vĩ đại đầu tiên của năm 2022",
    href: "/nha-thiet-ke-vi-dai-dau-tien-cua-nam-2022",
    postTime: "05/04/2022",
    description:
      "Đó là buổi trình diễn lớn đầu tiên của Tuần lễ thời trang Milan: 1 giờ chiều ngày 1. Mọi chiếc ghế trong không gian nhà kho hang động, nơi được&nbsp;trang trí bằng những chiếc vỏ bom bằng vải denim bơm hơi khổng lồ và những con khỉ mỡ&nbsp;, đều đã đầy ắp.&nbsp;Một số người tham dự dường như đã đến thẳng từ sân bay.&nbsp;Tim Blanks, nhà phê bình của Business of Fashion, đã có mặt tại buổi trình diễn “lần...",
    imgSrc: require("../../assets/image/news_Img.webp"),
  },
  {
    title: "Nhà thiết kế vĩ đại đầu tiên của năm 2022",
    href: "/nha-thiet-ke-vi-dai-dau-tien-cua-nam-2022",
    postTime: "05/04/2022",
    description:
      "Đó là buổi trình diễn lớn đầu tiên của Tuần lễ thời trang Milan: 1 giờ chiều ngày 1. Mọi chiếc ghế trong không gian nhà kho hang động, nơi được&nbsp;trang trí bằng những chiếc vỏ bom bằng vải denim bơm hơi khổng lồ và những con khỉ mỡ&nbsp;, đều đã đầy ắp.&nbsp;Một số người tham dự dường như đã đến thẳng từ sân bay.&nbsp;Tim Blanks, nhà phê bình của Business of Fashion, đã có mặt tại buổi trình diễn “lần...",
    imgSrc: require("../../assets/image/news_Img.webp"),
  },
  {
    title: "Nhà thiết kế vĩ đại đầu tiên của năm 2022",
    href: "/nha-thiet-ke-vi-dai-dau-tien-cua-nam-2022",
    postTime: "05/04/2022",
    description:
      "Đó là buổi trình diễn lớn đầu tiên của Tuần lễ thời trang Milan: 1 giờ chiều ngày 1. Mọi chiếc ghế trong không gian nhà kho hang động, nơi được&nbsp;trang trí bằng những chiếc vỏ bom bằng vải denim bơm hơi khổng lồ và những con khỉ mỡ&nbsp;, đều đã đầy ắp.&nbsp;Một số người tham dự dường như đã đến thẳng từ sân bay.&nbsp;Tim Blanks, nhà phê bình của Business of Fashion, đã có mặt tại buổi trình diễn “lần...",
    imgSrc: require("../../assets/image/news_Img.webp"),
  },
  {
    title: "Nhà thiết kế vĩ đại đầu tiên của năm 2022",
    href: "/nha-thiet-ke-vi-dai-dau-tien-cua-nam-2022",
    postTime: "05/04/2022",
    description:
      "Đó là buổi trình diễn lớn đầu tiên của Tuần lễ thời trang Milan: 1 giờ chiều ngày 1. Mọi chiếc ghế trong không gian nhà kho hang động, nơi được&nbsp;trang trí bằng những chiếc vỏ bom bằng vải denim bơm hơi khổng lồ và những con khỉ mỡ&nbsp;, đều đã đầy ắp.&nbsp;Một số người tham dự dường như đã đến thẳng từ sân bay.&nbsp;Tim Blanks, nhà phê bình của Business of Fashion, đã có mặt tại buổi trình diễn “lần...",
    imgSrc: require("../../assets/image/news_Img.webp"),
  },
  {
    title: "Nhà thiết kế vĩ đại đầu tiên của năm 2022",
    href: "/nha-thiet-ke-vi-dai-dau-tien-cua-nam-2022",
    postTime: "05/04/2022",
    description:
      "Đó là buổi trình diễn lớn đầu tiên của Tuần lễ thời trang Milan: 1 giờ chiều ngày 1. Mọi chiếc ghế trong không gian nhà kho hang động, nơi được&nbsp;trang trí bằng những chiếc vỏ bom bằng vải denim bơm hơi khổng lồ và những con khỉ mỡ&nbsp;, đều đã đầy ắp.&nbsp;Một số người tham dự dường như đã đến thẳng từ sân bay.&nbsp;Tim Blanks, nhà phê bình của Business of Fashion, đã có mặt tại buổi trình diễn “lần...",
    imgSrc: require("../../assets/image/news_Img.webp"),
  },
];

export default function NewsCard({ blog }) {
  const convertStringDate = (stringTime) => {
    const date = new Date(stringTime);
    const ngay = date.getDate();
    const thang = date.getMonth() + 1;
    const nam = date.getFullYear();
    const chuoiNgayThangNam =
      (ngay < 10 ? "0" : "") +
      ngay +
      "/" +
      (thang < 10 ? "0" : "") +
      thang +
      "/" +
      nam;
    return chuoiNgayThangNam;
  };
  const convertImageUrl = (stringHtml) => {
    const regex = /<img src=\"([^\"]+)\"/g;
    var match;
    while ((match = regex.exec(stringHtml)) !== null) {
      return match[1];
    }
  };
  return (
    <div className={cx("news-card-row")}>
      <div className={cx("item-blog")}>
        <div className={cx("block-thumb")}>
          <Link className={cx("thumb ")} to={`/blog/${blog.slug}`} title={blog.title}>
            <img
              className={cx("lazyload", "fixed-size-image")}
              src={convertImageUrl(blog.description)}
              alt={blog.title}
            />
          </Link>
        </div>
        <div className={cx("block-content")}>
          <h3>
            <Link to={`/blog/${blog.slug}`} title={blog.title}>
              {blog.title}
            </Link>
          </h3>
          <p className={cx("time-post")}>
            <span>{convertStringDate(blog.createdAt)}</span>
          </p>
          <p className={cx("justify")}>{blog.shortdesc}</p>
        </div>
      </div>
    </div>
  );
}
