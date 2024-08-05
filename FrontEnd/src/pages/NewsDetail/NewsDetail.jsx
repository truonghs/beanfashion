import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import style from "./NewsDetail.module.scss";
import classNames from "classnames/bind";

import Category from "../../components/Category/Category";
import Tags from "../../components/Tags/Tags";
import HotNews from "../../components/HotNews/HotNews";
import axiosClient from "../../config/axios";

const cx = classNames.bind(style);

export default function NewsDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    axiosClient
      .get(`/blog/${slug}`)
      .then(({ data }) => {
        setBlog(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  return (
    <article className={cx("article-main")}>
      <div className={cx("row")}>
        <div className={cx("right-content", "col-lg-9", "col-12", "order-lg-2")}>
          <div className={cx("article-details", "clearfix")}>
            <h1 className={cx("article-title")}>{blog.title}</h1>
            <div className={cx("posts")}>
              {/* <div className={cx("time-post", "f")}>
                <MdOutlineWatchLater className={cx("time-post__icon")} />
                Thứ Ba, 05/04/2022
              </div>
              <div className={cx("time-post")}>
                <FaUser className={cx("time-post__icon")} />
                <span>Bean Fashion</span>
              </div> */}
            </div>
            <div className={cx("blog__description")} dangerouslySetInnerHTML={{ __html: blog.description }} />
          </div>
        
          <form method="post" action="/posts/nha-thiet-ke-vi-dai-dau-tien-cua-nam-2022/comments" id="article_comments" acceptCharset="UTF-8">
            <div className={cx("form-coment")}>
              <div className={cx("margin-top-0", "w-100")}>
                <h5 className={cx("title-form-coment")}>Viết bình luận của bạn</h5>
              </div>
              <div className={cx("form-row")}>
                <div className={cx("user-info")}>
                  <div className={cx("col-md-6", "col-12")}>
                    <fieldset className={cx("form-group", "padding-0")}>
                      <input placeholder="Họ và tên" type="text" className={cx("form-control", "form-control-lg")} defaultValue="" id="full-name" name="Author" required="" />
                    </fieldset>
                  </div>
                  <div className={cx("col-md-6", "col-12")}>
                    <fieldset className={cx("form-group", "padding-0")}>
                      <input
                        placeholder="Email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                        type="email"
                        className={cx("form-control", "form-control-lg")}
                        defaultValue=""
                        name="Email"
                        required=""
                      />
                    </fieldset>
                  </div>
                </div>
                <div className={cx("col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")}>
                  <textarea placeholder="Nội dung" className={cx("form-control", "form-control-lg", "form-control-textarea")} id="comment" name="Body" rows={6} required="" defaultValue={""} />
                </div>
                <div className={cx("col-lg-12", "col-md-12", "col-sm-12", "col-xs-12")}>
                  <button type="submit" className={cx("btn", "btn-primary", "button_45")}>
                    Gửi thông tin
                  </button>
                </div>
              </div>
            </div>{" "}
            {/* End form mail */}
          </form>
        </div>
        <div className={cx("blog_left_base", "col-lg-3", "col-12", "order-lg-1")}>
          <div className={cx("side-right-stick")}>
            <Category />
            <Tags />
            <HotNews />
          </div>
        </div>
      </div>
    </article>
  );
}
