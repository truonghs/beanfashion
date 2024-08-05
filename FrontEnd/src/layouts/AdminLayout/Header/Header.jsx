import { useState, useEffect, useContext, useRef } from "react";

import io from "socket.io-client";

import { CiSearch, CiBellOn } from "react-icons/ci";

import { Toast } from "primereact/toast";

import style from "./Header.module.scss";
import className from "classnames/bind";

import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

const cx = className.bind(style);

const Header = () => {
  const toast = useRef(null);
  const { decodedToken } = useContext(AuthContext);

  const [newNoti, setNewNotis] = useState([]);
  const [showNoti, setShowNoti] = useState(false);
  function timeAgo(dateString) {
    const timestamp = new Date(dateString).getTime();
    const now = new Date().getTime();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) {
      return seconds === 1 ? "1 giây trước" : `${seconds} giây trước`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes === 1 ? "1 phút trước" : `${minutes} phút trước`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours === 1 ? "1 giờ trước" : `${hours} giờ trước`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
      return days === 1 ? "1 ngày trước" : `${days} ngày trước`;
    }

    const months = Math.floor(days / 30.44); // Sử dụng 30.44 để tính trung bình số ngày trong tháng
    if (months < 12) {
      return months === 1 ? "1 tháng trước" : `${months} tháng trước`;
    }

    const years = Math.floor(days / 365.25); // Sử dụng 365.25 để tính năm nhuận
    return years === 1 ? "1 năm trước" : `${years} năm trước`;
  }
  // Connect to websocket
  useEffect(() => {
    const socket = io("http://localhost:3002");

    socket.on("newOrder", (order) => {
      toast.current.show({
        severity: "success",
        summary: "Thông báo",
        detail: "Có một đơn hàng mới",
        life: 3000,
      });
      setNewNotis((prevNotis) => [
        ...prevNotis,
        {
          orderId: order._id,
          note: order?.note ?? "Không có ghi chú",
          checked: false, // dùng để check xem phải đơn mới không
          timestamp: order.createdAt,
        },
      ]);
    });

    // socket.on("updateOrder", (order) => {
    //   console.log("updateOrder", order);
    //   setNewNotis((prevNotis) => [
    //     ...prevNotis,
    //     {
    //       orderId: order._id,
    //       note: order?.note ?? "Không có ghi chú",
    //       status: false, // dùng để check xem phải đơn mới không
    //       timestamp: order.createdAt,
    //     },
    //   ]);
    // });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className={cx("header")}>
      <Toast ref={toast} />
      <div className={cx("logo")}>
        {/* <img src="logo.svg" alt="" /> */}
        <span className={cx("user-name")}>Dashboard</span>
      </div>
      <div className={cx("icons")}>
        <CiSearch className={cx("icon")} />
        <div className={cx("notification")}>
          <div
            className={cx("notification__bell")}
            onClick={() => setShowNoti((prevState) => !prevState)}
          >
            <CiBellOn className={cx("icon")} />
            <span>{newNoti?.length}</span>
          </div>
          {showNoti && (
            <ul className={cx("notification__list")}>
              <h2 className={cx("notification__header")}>Thông báo</h2>
              {newNoti.length > 0 ? (
                newNoti.map((noti, index) => (
                  <li
                    className={cx("notification__item")}
                    key={index}
                    onClick={() => {
                      setNewNotis((prevNotis) =>
                        prevNotis.filter((noti, id) => id !== index)
                      );
                      setShowNoti(false)
                    }}
                  >
                    <Link
                      to={`/admin/order-detail/${noti?.orderId}`}
                      className={cx("notification__item-link")}
                    >
                      <div className={cx("notification__name")}>
                        Đơn hàng mới
                        <strong> {noti?.orderId}</strong>
                      </div>
                      <div className={cx("notification__note")}>
                        Ghi chú: {noti?.note}
                      </div>
                      <div className={cx("notification__timestamp")}>
                        {timeAgo(noti?.timestamp)}
                      </div>
                    </Link>
                    <span className={cx("notification__checked")}></span>
                  </li>
                ))
              ) : (
                <div className={cx("text")}>Không có thông báo nào</div>
              )}
            </ul>
          )}
        </div>
        <div className={cx("user")}>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>{decodedToken?.userName}</span>
        </div>
        {/* <img src="/settings.svg" alt="" className={cx("icon")} /> */}
      </div>
    </div>
  );
};

export default Header;
