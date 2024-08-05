import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { CiSquareRemove } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import axiosClient from "../../../../config/axios";
import { useDebounce } from "../../../../hooks";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";

import { Toast } from "primereact/toast";

import style from "./ListBlogs.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

function ListBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchValue, 500);
  const toast = useRef(null);

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      await axiosClient
        .get(`/admin/blog/search/${debounced}`)
        .then(({ data }) => {
          setBlogs(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (!debounced.trim()) {
      axiosClient
        .get("/admin/blogs")
        .then(({ data }) => setBlogs(data))
        .catch((error) => console.log(error));
    } else {
      fetchApi();
    }
  }, [debounced]);
  const convertStringDate = (stringTime) => {
    var date = new Date(stringTime);
    var nam = date.getFullYear();
    var thang = date.getMonth() + 1;
    var ngay = date.getDate();
    var gio = date.getHours();
    var phut = date.getMinutes();
    var giay = date.getSeconds();
    const chuoiNgayThangNam =
      (ngay < 10 ? "0" : "") +
      ngay +
      "/" +
      (thang < 10 ? "0" : "") +
      thang +
      "/" +
      nam;
    return {
      date: chuoiNgayThangNam,
      time: gio + "h" + phut + "m" + giay + "s",
    };
  };

  const selectedBlog = (slug) => {
    if (selectedBlogs.includes(slug)) {
      const fillteredArr = selectedBlogs.filter(
        (slugBlog) => slugBlog !== slug
      );
      setSelectedBlogs([...fillteredArr]);
    } else {
      setSelectedBlogs([...selectedBlogs, slug]);
    }
  };
  const selectedAllBlogs = () => {
    const slugArr = blogs.map((blog) => blog.slug);
    if (selectedBlogs.length > 0) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs([...slugArr]);
    }
  };
  const deleteSelectedBlogs = (e) => {
    e.preventDefault();
    confirm("")
  };
  const deleteBlog = (slug) => {
    confirm(slug)
  };

  // confirm popup
  const accept = (slug) => {
    if (!!slug) {
      toast.current.show({
        severity: "success",
        summary: "Thông báo",
        detail: "Xóa sản phẩm thành công",
        life: 3000,
      });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.slug !== slug));
      axiosClient
        .delete(`/admin/blog/delete/${slug}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosClient
        .delete("/admin/blog/delete/all", { data: selectedBlogs })
        .then((res) => {
          setBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => !selectedBlogs.includes(blog.slug))
          );
          setSelectedBlogs([]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const reject = () => {};
  const confirm = (slug) => {
    if (!!slug) {
      confirmDialog({
        message: "Bạn có muốn xóa bài viết này?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        defaultFocus: "reject",
        acceptClassName: "p-button-danger",
        accept: () => accept(slug),
        reject,
      });
    } else {
      confirmDialog({
        message: "Bạn có muốn xóa tất cả các bài viết được chọn?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        defaultFocus: "reject",
        acceptClassName: "p-button-danger",
        accept: () => accept(slug),
        reject,
      });
    }
  };
  return (
    <div className={cx("listproducts__container")}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className={cx("addproduct__header")}>
        <h1 className={cx("addproduct__header-title")}>Danh sách bài viết</h1>
        <Link
          to="/admin/blog/create"
          className={cx("addproduct__header-btn-create")}
        >
          <IoMdAdd />
          <span>Thêm bài viết</span>
        </Link>
      </div>
      <div className={cx("addproduct__body")}>
        <div className={cx("addproduct__action")}>
          <div className={cx("action-search")}>
            <GoSearch className={cx("action-search-icon")} />
            <input
              type="text"
              className={cx("action-search-input")}
              placeholder="Tìm kiếm tài khoản..."
              onChange={handleChange}
            />
          </div>
          <div className={cx("action-delete")}>
            {selectedBlogs.length > 0 ? (
              <>
                <FaTrashAlt />
                <button onClick={deleteSelectedBlogs}>
                  Delete {selectedBlogs.length}
                </button>
              </>
            ) : null}
          </div>
        </div>
        <table className={cx("addproduct__table")}>
          <thead className={cx("table-head-list")}>
            <tr>
              <th className={cx("table-head-item")}>
                <input
                  type="checkbox"
                  className={cx("action-checkbox")}
                  onChange={selectedAllBlogs}
                  checked={selectedBlogs.length > 0}
                />
              </th>
              <th className={cx("table-head-item")}>Tên bài viết</th>
              <th className={cx("table-head-item")}>Thời gian tạo</th>
              <th className={cx("table-head-item")}>Tình trạng</th>
              <th className={cx("table-head-item")}>Thao tác</th>
            </tr>
          </thead>

          <tbody className={cx("table-body")}>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <tr className={cx("product-item")} key={index}>
                  <td className={cx("action-checkbox")}>
                    <input
                      type="checkbox"
                      onChange={() => selectedBlog(blog.slug)}
                      checked={selectedBlogs.includes(blog.slug)}
                    />
                  </td>
                  <td>
                    <div className={cx("product-info")}>
                      <div className={cx("product-info-detail")}>
                        <p className={cx("product-name")}>
                          <strong>{blog.title}</strong>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className={cx("product-time")}>
                    <p className={cx("product-date")}>
                      <strong>{convertStringDate(blog.updatedAt).date}</strong>
                    </p>
                    <span className={cx("product-time-detail")}>
                      {convertStringDate(blog.updatedAt).time}
                    </span>
                  </td>
                  <td className={cx("product-status")}>
                    {blog?.status ? "active" : "inactive"}
                  </td>
                  <td className={cx("product-action")}>
                    <ul className={cx("product-action-list")}>
                      <li className={cx("product-action-item")}>
                        <Link to={`/admin/blog/edit/${blog.slug}`}>
                          <TbEdit className={cx("icon", "icon-edit")} />
                          Edit
                        </Link>
                      </li>
                      <li className={cx("product-action-item")}  onClick={() => deleteBlog(blog.slug)}>
                        <CiSquareRemove
                          className={cx("icon", "icon-remove")}
                         
                        />
                        Remove
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <div>Chưa có bài viết nào</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListBlogs;
