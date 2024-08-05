import style from "./Orders.module.scss";
import className from "classnames/bind";
import React, { useState, useEffect } from "react";
import SideBar from "../../components/Account/SideBar/SideBar";
import { Link } from "react-router-dom";
import axiosClient from "../../config/axios";
const cx = className.bind(style);

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axiosClient
      .get(`/order/get-all`)
      .then(({ data }) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
      });
  }, []);
  return (
    <div className={cx("content")}>
      <div className={cx("wrapper")}>
        <SideBar />
        <div className={cx("main")}>
          <div className={cx("title")}>ĐƠN HÀNG CỦA BẠN</div>
          <table className={cx("ordersTable")}>
            <thead className={cx("ordersHeading")}>
              <tr>
                <th className={cx("headingTilte")}>Đơn hàng</th>
                <th className={cx("headingTilte")}>Ngày</th>
                <th className={cx("headingTilte")}>Địa chỉ</th>
                <th className={cx("headingTilte")}>Giá trị đơn hàng</th>
                <th className={cx("headingTilte")}>Trạng thái</th>
              </tr>
            </thead>
            <tbody className={cx("ordersBody")}>
              {orders == [] ? (
                <tr className={cx("tableRow")}>
                  <td className={cx("tableData")} colSpan={"5"}>
                    <p>Không có đơn hàng nào</p>
                  </td>
                </tr>
              ) : null}
              {orders.map((order, index) => {
                const date = new Date(order?.createdAt);
                return (
                  <tr className={cx("tableRow")}>
                    <td className={cx("tableData")}>
                      <Link to={`/order-detail/${order?._id}`} className={cx("link")}>
                        <div className={cx("tableDataContainer")}>#{index + 1}</div>
                      </Link>
                    </td>
                    <td className={cx("tableData")}>
                      <div className={cx("tableDataContainer")}>
                        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                      </div>
                    </td>
                    <td className={cx("tableData", "tableDataAddress")}>
                      <div className={cx("tableDataContainer", "address")}>
                        {order?.address?.detail}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.province}
                      </div>
                    </td>
                    <td className={cx("tableData")}>
                      <div className={cx("tableDataContainer")}>
                        {
                          (order?.totalPrice*1000).toLocaleString('de-DE')
                        }đ
                      {/* {order?.totalPrice > 1000 ? Math.floor(order?.totalPrice / 1000) + "." + (order?.totalPrice % 1000) : order?.totalPrice}.000đ */}
                      </div>
                    </td>
                    <td className={cx("tableData")}>
                      <div className={order?.paid === true ? cx("tableDataContainer", "paid") : cx("tableDataContainer", "noPaid")}>{order?.paid === true ? "Đã thanh toán" : "Chưa thanh toán"}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
