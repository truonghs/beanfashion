import React from "react";
import style from "./HotNews.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

export default function HotNews() {
  return (
    <div className={cx("blog_noibat")}>
      <h2 className={cx("h2_sidebar_blog")}>
        <Link
          to="/blogs/all"
          title="Tin tức nổi bật"
          className={cx("blog_noibat__title")}
        >
          Tin tức nổi bật
        </Link>
      </h2>
      <div className={cx("blog_content")}>
        <div className={cx("item")}>
          <div className={cx("post-thumb")}>
            <Link
              className={cx("image-blog", "scale_hover")}
              to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
            >
              <img
                className={cx("img_blog", "lazyload", "loaded")}
                src={require("../../assets/image/news_Img.webp")}
                alt="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                data-was-processed="true"
              />
            </Link>
          </div>
          <div className={cx("contentright")}>
            <h3>
              <Link
                title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              >
                4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các
                nàng
              </Link>
            </h3>
            <p className={cx("time-post")}>
              <span>05/04/2022</span>
            </p>
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("post-thumb")}>
            <Link
              className={cx("image-blog", "scale_hover")}
              to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
            >
              <img
                className={cx("img_blog", "lazyload", "loaded")}
                src={require("../../assets/image/news_Img.webp")}
                alt="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                data-was-processed="true"
              />
            </Link>
          </div>
          <div className={cx("contentright")}>
            <h3>
              <Link
                title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              >
                4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các
                nàng
              </Link>
            </h3>
            <p className={cx("time-post")}>
              <span>05/04/2022</span>
            </p>
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("post-thumb")}>
            <Link
              className={cx("image-blog", "scale_hover")}
              to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
            >
              <img
                className={cx("img_blog", "lazyload", "loaded")}
                src={require("../../assets/image/news_Img.webp")}
                alt="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                data-was-processed="true"
              />
            </Link>
          </div>
          <div className={cx("contentright")}>
            <h3>
              <Link
                title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              >
                4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các
                nàng
              </Link>
            </h3>
            <p className={cx("time-post")}>
              <span>05/04/2022</span>
            </p>
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("post-thumb")}>
            <Link
              className={cx("image-blog", "scale_hover")}
              to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
            >
              <img
                className={cx("img_blog", "lazyload", "loaded")}
                src={require("../../assets/image/news_Img.webp")}
                alt="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                data-was-processed="true"
              />
            </Link>
          </div>
          <div className={cx("contentright")}>
            <h3>
              <Link
                title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              >
                4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các
                nàng
              </Link>
            </h3>
            <p className={cx("time-post")}>
              <span>05/04/2022</span>
            </p>
          </div>
        </div>
        <div className={cx("item")}>
          <div className={cx("post-thumb")}>
            <Link
              className={cx("image-blog", "scale_hover")}
              to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
            >
              <img
                className={cx("img_blog", "lazyload", "loaded")}
                src={require("../../assets/image/news_Img.webp")}
                alt="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                data-was-processed="true"
              />
            </Link>
          </div>
          <div className={cx("contentright")}>
            <h3>
              <Link
                title="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
                to="/4-kieu-trang-phuc-denim-dang-hot-nhat-hack-moi-do-tuoi-cho-cac-nang"
              >
                4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các
                nàng
              </Link>
            </h3>
            <p className={cx("time-post")}>
              <span>05/04/2022</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
