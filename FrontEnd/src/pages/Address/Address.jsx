import style from "./Address.module.scss";
import className from "classnames/bind";
import { IoIosArrowForward } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import SideBar from "../../components/Account/SideBar/SideBar";
import AddAddressForm from "../../components/AddAddressForm/AddAddressForm";
import axiosClient from "../../config/axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
const cx = className.bind(style);

function Address() {
  const [hiddenForm, setHiddenForm] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const fetchAddresses = () => {
    axiosClient
      .get(`/user/address`)
      .then(({ data }) => {
        setAddresses(data.addresses);
      })
      .catch((error) => {
        console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
      });
  };
  const deleteAddress = (index) => {
    axiosClient
      .post(`/user/address/delete`, { index })
      .then(({ data }) => {
        show();
        fetchAddresses();
      })
      .catch((error) => {
        console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
      });
  };
  const reject = () => {
    return 0;
  };
  useEffect(() => {
    fetchAddresses();
  }, [hiddenForm]);

  const handleDelete = (index) => {
    confirmDialog({
      message: "Bạn có muốn xóa địa chỉ này?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteAddress(index),
      reject,
    });
  };
  const toast = useRef(null);
  const show = () => {
    toast.current.show({ severity: "success", summary: "Thông Báo", detail: "Xóa địa chỉ thành công!" });
  };
  return (
    <div className={cx("content")}>
      {!hiddenForm ? <div className={cx("isOverlay")}></div> : null}
      {!hiddenForm ? <AddAddressForm hiddenForm={hiddenForm} setHiddenForm={setHiddenForm} /> : null}
      <ConfirmDialog style={{ width: "24vw" }} />
      <Toast ref={toast} />
      <div className={cx("wrapper")}>
        <SideBar />
        <div className={cx("main")}>
          <div className={cx("title")}>Địa chỉ của bạn</div>
          <div onClick={(e) => setHiddenForm(false)} className={cx("add-address")}>
            Thêm địa chỉ
          </div>
          {addresses.map((address, index) => (
            <div key={index} className={cx("addressContainer")}>
              <div className={cx("addressField")}>
                <div className={cx("account-info")}>
                  <strong>Họ tên: </strong>
                  {address?.name}
                </div>
                <div className={cx("account-info")}>
                  <strong>Địa chỉ: </strong>
                  {address?.detail}, {address?.ward}, {address?.district}, {address?.province}
                </div>
                <div className={cx("account-info")}>
                  <strong>Số điện thoại: </strong>
                  {address?.phoneNumber}
                </div>
              </div>
              <div onClick={() => handleDelete(index)} className={cx("btnField")}>
                <div className={cx("deleteBtn")}>xóa</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Address;
