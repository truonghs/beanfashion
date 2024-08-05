import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import style from "./CreateBlog.module.scss";
import classNames from "classnames/bind";

import axiosClient from "../../../../config/axios";
import Editor from "../../../../components/Editor/Editor";

const cx = classNames.bind(style);

const sampleBlog = {
  title: "",
  description: "",
  shortdesc: "",
};
function CreateBlog() {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(sampleBlog);

  const handleChange = (html) => {
    setBlog({ ...blog, description: html });
  };

  const addBlog = (e) => {
    e.preventDefault();
    axiosClient
      .post("/admin/blog/store", blog)
      .then((res) => {
        navigate("/admin/blogs")
        console.log(res)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={cx("createblog__container")}>
      <form action="" className={cx("formcontainer")}>
        <h2 className={cx("title")}>Biểu mẫu thêm tin tức</h2>
        <div className={cx("form-group")}>
          <label htmlFor="productname" className={cx("form-label")}>
            Tiêu đề bài viết
          </label>
          <br />
          <input
            type="text"
            className={cx("form-control")}
            name="blog-title"
            placeholder="4 kiểu trang phục denim đang hot nhất hack mọi độ tuổi cho các nàng"
            value={blog.title}
            onChange={(e) =>
              setBlog({
                ...blog,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="productname" className={cx("form-label")}>
            Mô tả bài viết
          </label>
          <br />
          <Editor handleChange={handleChange} value={blog.description} />
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="productname" className={cx("form-label")}>
            Tóm tắt bài viết
          </label>
          <br />
          <textarea
            type="text"
            className={cx("form-control")}
            name="blog-title"
            placeholder="Tóm tắt khoảng 100 từ"
            value={blog.shortdesc}
            onChange={(e) =>
              setBlog({
                ...blog,
                shortdesc: e.target.value,
              })
            }
          />
        </div>
        <button className={cx("form-submit")} onClick={addBlog}>
          Thêm bài viết
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
