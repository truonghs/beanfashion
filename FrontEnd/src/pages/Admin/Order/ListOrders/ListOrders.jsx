import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import ReactPaginate from "react-paginate";

import { CiSquareRemove } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { GrNext, GrPrevious } from "react-icons/gr";

import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

import style from "./ListOrders.module.scss";
import classNames from "classnames/bind";

import axiosClient from "../../../../config/axios";
import { useDebounce } from "../../../../hooks";

const cx = classNames.bind(style);
const fetchOrders = async ({ queryKey }) => {
  const [_, currentPage, currentLimit, debounced, debouncedUserId] = queryKey;
  let url = `/admin/orders?page=${currentPage}&limit=${currentLimit}`;

  if (debounced) {
    url = `/order/get/?orderId=${debounced}`;
  } else if (debouncedUserId) {
    url = `/admin/orders/search-by-user?page=${currentPage}&limit=${currentLimit}&userId=${debouncedUserId}`;
  }

  const { data } = await axiosClient.get(url);
  return data;
};

const deleteOrder = async (orderId) => {
  await axiosClient.delete(`/admin/orders/delete?orderId=${orderId}`);
};

const updateOrderStatus = async ({ orderId, status }) => {
  await axiosClient.post("/admin/orders/change-status", {
    orderId,
    status,
  });
};

function ListOrders() {
  const [searchValue, setSearchValue] = useState("");
  const [userId, setUserId] = useState("");
  const debounced = useDebounce(searchValue, 500);
  const debouncedUserId = useDebounce(userId, 500);
  const toast = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedIndex, setSeletedIndex] = useState(null);

  // Connect react-query
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["orders", currentPage, currentLimit, debounced, debouncedUserId],
    fetchOrders,
    {
      keepPreviousData: true,
    }
  );

  const deleteMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      toast.current.show({
        severity: "success",
        summary: "Thông báo",
        detail: "Đơn hàng đã được xóa",
        life: 3000,
      });
      queryClient.invalidateQueries("orders");
    },
    onError: (e) => {
      console.log("Đơn hàng không được xóa!", e);
    },
  });

  const updateMutation = useMutation(updateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
      toast.current.show({
        severity: "success",
        summary: "Thông báo",
        detail: "Cập nhật trạng thái đơn hàng thành công!",
        life: 3000,
      });
    },
    onError: (e) => {
      console.log("Cập nhật trạng thái đơn hàng không thành công!", e);
    },
  });

  const handleDelete = (order) => {
    confirmDialog({
      message: "Bạn có muốn xóa đơn hàng này?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteMutation.mutate(order._id),
      reject: () => {},
    });
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const handleChangeUser = (e) => {
    const userId = e.target.value;
    if (!userId.startsWith(" ")) {
      setUserId(userId);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleChangeState = (value, order, index) => {
    setSeletedIndex(index);
    setSelectedState(value);
    updateMutation.mutate({ orderId: order._id, status: value });
  };

  const states = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang vận chuyển",
    "Đã giao",
    "Đã hủy",
  ];

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
  return (
    <div className={cx("addproduct__container")}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className={cx("addproduct__header")}>
        <h1 className={cx("addproduct__header-title")}>Danh sách đơn hàng</h1>
      </div>
      <div className={cx("addproduct__body")}>
        <div className={cx("addproduct__action")}>
          <div className={cx("action-search")}>
            <GoSearch className={cx("action-search-icon")} />
            <input
              type="text"
              className={cx("action-search-input")}
              placeholder="Mã đơn hàng..."
              onChange={handleChange}
            />
          </div>
          <div className={cx("action-search")}>
            <GoSearch className={cx("action-search-icon")} />
            <input
              type="text"
              className={cx("action-search-input")}
              placeholder="Mã khách hàng..."
              onChange={handleChangeUser}
            />
          </div>
        </div>
        <table className={cx("addproduct__table")}>
          <thead className={cx("table-head-list")}>
            <tr>
              <th className={cx("table-head-item")}>Mã đơn hàng</th>
              <th className={cx("table-head-item")}>Thời gian tạo</th>
              <th className={cx("table-head-item")}>Tổng tiền</th>
              <th className={cx("table-head-item")}>Hình thức thanh toán</th>
              <th className={cx("table-head-item")}>Tình trạng thanh toán</th>
              <th className={cx("table-head-item")}>Tình trạng đơn hàng</th>
              <th className={cx("table-head-item")}>Thao tác</th>
            </tr>
          </thead>

          <tbody className={cx("table-body")}>
            {data?.data?.length > 0 ? (
              data?.data?.map((order, index) => {
                const statusValue = order?.status
                  ? order?.status
                  : "Chờ xác nhận";
                return (
                  <tr className={cx("order-item")} key={index}>
                    <td>
                      <div className={cx("order-info")}>
                        <div className={cx("order-info-detail")}>
                          <p className={cx("order-name")}>
                            <Link
                              to={`/admin/order-detail/${order?._id}`}
                              className={cx("link")}
                            >
                              <div className={cx("tableDataContainer")}>
                                <strong>{order?._id}</strong>
                              </div>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className={cx("order-time")}>
                      <p className={cx("order-date")}>
                        <strong>
                          {convertStringDate(order?.updatedAt).date}
                        </strong>
                      </p>
                      <span className={cx("order-time-detail")}>
                        {convertStringDate(order?.updatedAt).time}
                      </span>
                    </td>
                    <td className={cx("order-price")}>
                      {(order?.totalPrice * 1000).toLocaleString("de-DE")}đ
                      {/* {order?.totalPrice > 1000
                        ? Math.floor(order?.totalPrice / 1000) + "." + (order?.totalPrice % 1000 > 100 ? order?.totalPrice % 1000 : "0" + (order?.totalPrice % 1000))
                        : order?.totalPrice}
                      .000đ */}
                    </td>
                    <td className={cx("")}>
                      <strong>{order?.paymentMethod}</strong>
                    </td>
                    <td className={cx("order-stock")}>
                      <p className={cx("order-stock-detail")} key={index}>
                        {order?.paid == true
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </p>
                    </td>

                    <td className={cx("order-status")}>
                      <div
                        className={cx(
                          "order-status-container",
                          order?.status === "Đã giao"
                            ? "order-status-container-green"
                            : order?.status === "Đã hủy"
                            ? "order-status-container-red"
                            : order?.status === "Chờ xác nhận"
                            ? "order-status-container-yellow"
                            : order?.status === "Đang vận chuyển"
                            ? "order-status-container-blue"
                            :order?.status === "Đã xác nhận"
                            ? "order-status-container-orange"
                            :""
                        )}
                      >
                        <Dropdown
                          defaultValue={order?.status}
                          value={
                            index == selectedIndex
                              ? selectedState
                              : order?.status
                          }
                          onChange={(e) =>
                            handleChangeState(e.value, order, index)
                          }
                          options={states}
                          placeholder="Tình trạng đơn hàng"
                          checkmark={true}
                          disabled={
                            order?.status === "Đã giao" ||
                            order?.status === "Đã huỷ"
                          }
                          className="w-full md:w-14rem"
                        />
                      </div>
                    </td>
                    <td className={cx("order-action")}>
                      <ul className={cx("order-action-list")}>
                        <li
                          onClick={() => handleDelete(order)}
                          className={cx("order-action-item")}
                        >
                          <CiSquareRemove
                            className={cx("icon", "icon-remove")}
                          />
                          Remove
                        </li>
                      </ul>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>Chưa có sản phẩm nào</div>
            )}
          </tbody>
        </table>
      </div>
      {data?.pagination?.totalPages > 0 && (
        <div className={cx("paginations-container")}>
          <ReactPaginate
            nextLabel={<GrNext />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.pagination?.totalPages}
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

export default ListOrders;
