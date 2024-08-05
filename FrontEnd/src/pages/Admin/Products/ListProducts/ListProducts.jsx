import { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import io from "socket.io-client";

import { TbEdit } from "react-icons/tb";
import { CiSquareRemove } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { GrNext, GrPrevious } from "react-icons/gr";
import axiosClient from "../../../../config/axios";
import { useDebounce } from "../../../../hooks";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";

import { Toast } from "primereact/toast";

import style from "./ListProducts.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

function ListProducts() {
  const navigate = useNavigate();
  // products
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  // loading
  const [loading, setLoading] = useState(false);
  // search
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debounced = useDebounce(searchValue, 500);
  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);

    inputRef.current.focus();
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };
  const fetchData = async () => {
    await axiosClient
      .get(`/admin/products?page=${currentPage}&limit=${currentLimit}`)
      .then(({ data }) => {
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);
  useEffect(() => {
    if (!debounced.trim()) {
      fetchData();
    } else {
      const fetchApi = async () => {
        setLoading(true);
        await axiosClient
          .get(`/product/search/${debounced}`)
          .then(({ data }) => {
            setProducts(data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchApi();
    }
  }, [debounced]);

  // utils
  const convertStringDate = (stringTime) => {
    var date = new Date(stringTime);
    var nam = date.getFullYear();
    var thang = date.getMonth() + 1;
    var ngay = date.getDate();
    var gio = date.getHours();
    var phut = date.getMinutes();
    var giay = date.getSeconds();
    const chuoiNgayThangNam = (ngay < 10 ? "0" : "") + ngay + "/" + (thang < 10 ? "0" : "") + thang + "/" + nam;
    return {
      date: chuoiNgayThangNam,
      time: gio + "h" + phut + "m" + giay + "s",
    };
  };
  // delete 1 product
  const deleteProduct = (slug) => {
    confirm(slug);
  };
  // selected 1 product
  const selectedProduct = (slug) => {
    if (selectedProducts.includes(slug)) {
      const fillteredArr = selectedProducts.filter((productSlug) => productSlug !== slug);
      setSelectedProducts([...fillteredArr]);
    } else {
      setSelectedProducts([...selectedProducts, slug]);
    }
  };
  // selected all producsts
  const selectedAllProducts = () => {
    const slugArr = products.map((product) => product?.slug);
    if (selectedProducts.length > 0) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts([...slugArr]);
    }
  };
  // delete many products
  const deleteSelectedproduct = (e) => {
    e.preventDefault();
    confirm("");
  };

  // sale hour

  const [saleHour, setSaleHour] = useState(-1);
  const [hidePopup, setHidePopup] = useState(true);
  const [productId, setProductId] = useState("");

  const currentDate = new Date();
  const initialSaleDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const [saleDay, setSaleDay] = useState(initialSaleDay);
  const [discountPercent, setDiscountPercent] = useState(0);
  const toast = useRef(null);
  const handleChangeSaleDay = (event) => {
    setSaleDay(event.target.value);
  };

  const addProductToSale = async () => {
    if (parseInt(saleHour) === -1) {
      toast.current.show({ severity: "error", summary: "Lỗi", detail: "Vui lòng chọn khung giờ", life: 3000 });
      return;
    }

    if (parseInt(discountPercent) > 100) {
      toast.current.show({ severity: "error", summary: "Lỗi", detail: "Mức giảm giá từ 0 - 100%", life: 3000 });
      return;
    }

    await axiosClient
      .post("/admin/sale/add", {
        productId: productId,
        saleHour: saleHour,
        saleDay: saleDay,
        discountPercent: discountPercent,
      })
      .then((res) => {
        const socket = io("http://localhost:3002");
        socket.emit("saleProduct", "có sale mới"); // Gửi dữ liệu đơn hàng mới qua WebSocket
        toast.current.show({ severity: "success", summary: "Thành công", detail: "Thêm sản phẩm thành công", life: 3000 });
        setHidePopup((prevState) => !prevState);
        setSaleHour(-1);
        setSaleDay(new Date());
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Lỗi",
          detail: "Đã có lỗi xảy ra",
          life: 3000,
        });
        console.log(error);
      });
  };

  const togglePopup = (productId = "") => {
    setHidePopup((prevState) => !prevState);
    setProductId(productId);
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
      setProducts((prevProducts) => prevProducts.filter((product) => product?.slug !== slug));
      axiosClient
        .delete(`/admin/product/delete/${slug}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosClient
        .delete("/admin/product/delete/all", { data: selectedProducts })
        .then((res) => {
          setProducts((prevProducts) => prevProducts.filter((product) => !selectedProducts.includes(product?.slug)));
          setSelectedProducts([]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const reject = () => { };
  const confirm = (slug) => {
    if (!!slug) {
      confirmDialog({
        message: "Bạn có muốn xóa sản phẩm này?",
        header: "Delete Confirmation",
        icon: "pi pi-info-circle",
        defaultFocus: "reject",
        acceptClassName: "p-button-danger",
        accept: () => accept(slug),
        reject,
      });
    } else {
      confirmDialog({
        message: "Bạn có muốn xóa tất cả các sản phẩm được chọn?",
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
    <div className={cx("addproduct__container")}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className={cx("addproduct__header")}>
        <h1 className={cx("addproduct__header-title")}>Danh sách sản phẩm</h1>
        <Link to="/admin/product/create" className={cx("addproduct__header-btn-create")}>
          <IoMdAdd />
          <span>Thêm sản phẩm</span>
        </Link>
      </div>
      <div className={cx("addproduct__body")}>
        <div className={cx("addproduct__action")}>
          {/* <select name="stock" id="" className={cx("action-stock")}>
            <option value="">In stock</option>
            <option value="">Low stock</option>
            <option value="">Out of stock</option>
          </select>
          <select name="stock" id="" className={cx("action-active")}>
            <option value="">Published</option>
            <option value="">Draft</option>
          </select> */}
          <div className={cx("action-search")}>
            <GoSearch className={cx("action-search-icon")} />
            <input type="text" className={cx("action-search-input")} placeholder="Tìm kiếm sản phẩm..." onChange={handleChange} />
          </div>
          <div className={cx("action-delete")}>
            {selectedProducts.length > 0 ? (
              <>
                <FaTrashAlt />
                <button onClick={deleteSelectedproduct}>Delete {selectedProducts.length}</button>
              </>
            ) : null}
          </div>
        </div>
        <table className={cx("addproduct__table")}>
          <thead className={cx("table-head-list")}>
            <tr>
              <th className={cx("table-head-item")}>
                <input type="checkbox" className={cx("action-checkbox")} onChange={selectedAllProducts} checked={selectedProducts.length > 0} />
              </th>
              <th className={cx("table-head-item")}>Tên sản phẩm</th>
              <th className={cx("table-head-item")}>Thời gian tạo</th>
              <th className={cx("table-head-item")}>Kho hàng</th>
              <th className={cx("table-head-item")}>Giá</th>
              <th className={cx("table-head-item")}>Tình trạng</th>
              <th className={cx("table-head-item")}>Thao tác</th>
            </tr>
          </thead>

          <tbody className={cx("table-body")}>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr className={cx("product-item")} key={index}>
                  <td className={cx("action-checkbox")}>
                    <input type="checkbox" onChange={() => selectedProduct(product?.slug)} checked={selectedProducts.includes(product?.slug)} />
                  </td>
                  <td>
                    <div className={cx("product-info")}>
                      <img src={product?.images[0]?.imgUrl} alt={product?.slug} className={cx("product-img")} />
                      <div className={cx("product-info-detail")}>
                        <p className={cx("product-name")}>
                          <strong>{product?.name}</strong>
                        </p>
                        <span className={cx("product-category")}>{product?.category.categoryDetail}</span>
                      </div>
                    </div>
                  </td>
                  <td className={cx("product-time")}>
                    <p className={cx("product-date")}>
                      <strong>{convertStringDate(product?.updatedAt).date}</strong>
                    </p>
                    <span className={cx("product-time-detail")}>{convertStringDate(product?.updatedAt).time}</span>
                  </td>
                  <td className={cx("product-stock")}>
                    {product?.stock.map((stockItem, index) => (
                      <p className={cx("product-stock-detail")} key={index}>
                        Size : {stockItem.size} - Màu : {stockItem.color} - {stockItem.quantity} cái
                      </p>
                    ))}
                  </td>
                  <td className={cx("product-price")}>{(product?.price * 1000).toLocaleString('de-DE')}đ</td>
                  <td className={cx("product-status")}>{product?.status ? "Có" : "Không"}</td>
                  <td className={cx("product-action")}>
                    <ul className={cx("product-action-list")}>
                      <li className={cx("product-action-item")}>
                        <Link to={`/admin/product/edit/${product?.slug}`}>
                          <TbEdit className={cx("icon", "icon-edit")} />
                          Edit
                        </Link>
                      </li>

                      <li className={cx("product-action-item")} onClick={() => deleteProduct(product?.slug)}>
                        <CiSquareRemove className={cx("icon", "icon-remove")} />
                        Remove
                      </li>
                      <li className={cx("product-action-item")}>
                        <div onClick={() => togglePopup(product?._id)}>
                          <CiSquarePlus className={cx("icon", "icon-add-sale")} />
                          Add Sale
                        </div>
                        {!hidePopup && <div className={cx("popup-backdrop")}></div>}
                        {!hidePopup && (
                          <div className={cx("popup-container")}>
                            <div className={cx("popup-header")}>
                              <span>
                                <CiSquarePlus className={cx("popup-icon")} />
                                Nhập thông tin
                                <IoClose className={cx("popup-close-icon")} onClick={() => setHidePopup(true)} />
                              </span>
                            </div>
                            <div className={cx("popup-content")}>
                              <div className={cx("hour")}>
                                <span>Chọn khung giờ:</span>
                                <select value={saleHour} onChange={(e) => setSaleHour(e.target.value)}>
                                  <option value={-1}>Chọn khung giờ</option>
                                  <option value={0}>00:00 - 06:00</option>
                                  <option value={6}>06:00 - 12:00</option>
                                  <option value={12}>12:00 - 18:00</option>
                                  <option value={18}>18:00 - 24:00</option>
                                </select>
                              </div>
                              <div className={cx("date")}>
                                <span>Chọn ngày:</span>
                                <input type="date" value={saleDay} onChange={handleChangeSaleDay} />
                              </div>
                              <div className={cx("discount")}>
                                <span>Phần trăm giảm giá:</span>
                                <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} min={0} max={99} maxLength={2} pattern="[0-9]*" />
                              </div>
                              <div className={cx("popup-button-group")}>
                                <button type="button" className={cx("btn-continue")} onClick={() => togglePopup()}>
                                  Hủy
                                </button>
                                <button type="button" className={cx("btn-checkout")} onClick={addProductToSale}>
                                  Thêm
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <div>Chưa có sản phẩm nào</div>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 0 && (
        <div className={cx("paginations-container")}>
          <ReactPaginate
            nextLabel={<GrNext />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel={<GrPrevious />}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
}

export default ListProducts;
