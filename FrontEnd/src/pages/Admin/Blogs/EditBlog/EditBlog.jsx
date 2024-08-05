import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import style from "./EditBlog.module.scss";
import classNames from "classnames/bind";

import axiosClient from "../../../../config/axios";
import Editor from "../../../../components/Editor/Editor";

const cx = classNames.bind(style);

const sampleBlog = {
  title: "",
  description: "",
  shortdesc: "",
};
function EditBlog() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [blog, setBlog] = useState(sampleBlog);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await axiosClient
        .get(`/admin/blog/${slug}`)
        .then(({ data }) => {
          setBlog(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [slug]);
  const handleChange = (html) => {
    setBlog({ ...blog, description: html });
  };
  const updateBlog = (e) => {
    e.preventDefault();
    axiosClient
      .put(`/admin/blog/update/${slug}`, blog)
      .then((res) => {
        console.log(res);
        navigate("/admin/blogs");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {" "}
      {!loading && (
        <div className={cx("editblog__container")}>
          <form action="" className={cx("formcontainer")}>
            <h2 className={cx("title")}>Biểu mẫu sửa tin tức</h2>
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
            <button className={cx("form-submit")} onClick={updateBlog}>
              Sửa bài viết
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditBlog;
