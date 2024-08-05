import { useState, useEffect, useRef, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { CiSquareRemove } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import axiosClient from "../../../config/axios";
import { useDebounce } from "../../../hooks";
import style from "./ListUsers.module.scss";
import classNames from "classnames/bind";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import {AuthContext} from "../../../context/AuthContext"
const cx = classNames.bind(style);

function ListUsers() {
  const {decodedToken} = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchValue, 500);
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  const toast = useRef(null);
  const accept = (email) => {
    toast.current.show({ severity: "success", summary: "Thông báo", detail: "Xóa người dùng thành công", life: 3000 });
    setLoading(true);
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.email !== email));
    axiosClient
      .delete(`/admin/account/delete/${email}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const reject = () => {};
  const confirm = (email) => {
    confirmDialog({
      message: "Bạn có muốn xóa người dùng này?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => accept(email),
      reject,
    });
  };
  const fetchApi = async () => {
    setLoading(true);

    await axiosClient
      .get(`/admin/account/search/${debounced}`)
      .then(({ data }) => {
        setAccounts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!debounced.trim()) {
      axiosClient
        .get("/admin/accounts")
        .then(({ data }) => setAccounts(data))
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
    const chuoiNgayThangNam = (ngay < 10 ? "0" : "") + ngay + "/" + (thang < 10 ? "0" : "") + thang + "/" + nam;
    return {
      date: chuoiNgayThangNam,
      time: gio + "h" + phut + "m" + giay + "s",
    };
  };
  const deleteAccount = (email) => {
    confirm(email);
  };
  const selectedAccount = (email) => {
    if (selectedAccounts.includes(email)) {
      const fillteredArr = selectedAccounts.filter((accountEmail) => accountEmail !== email);
      setSelectedAccounts([...fillteredArr]);
    } else {
      setSelectedAccounts([...selectedAccounts, email]);
    }
  };
  const selectedAllAccounts = () => {
    const slugArr = accounts.map((account) => account.email);
    if (selectedAccounts.length > 0) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts([...slugArr]);
    }
  };
  const deleteSelectedAccounts = (e) => {
    e.preventDefault();
    axiosClient
      .delete("/admin/account/delete/all", { data: selectedAccounts })
      .then((res) => {
        setAccounts((prevAccounts) => prevAccounts.filter((account) => !selectedAccounts.includes(account.email)));
        setSelectedAccounts([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const roles = ["admin", "customer"];
  const [selectedState, setSelectedState] = useState(null);
  const [selectedIndex, setSeletedIndex] = useState(null);
  const handleChangeState = (value, user, index) => {
    setSeletedIndex(index);
    setSelectedState(value);
    setLoading(true);
    axiosClient
      .post(`/admin//accounts/change-role`, { userId: user._id, role: value })
      .then(({ data }) => {
        fetchApi();
        setLoading(false);
        toast.current.show({ severity: "success", summary: "Thông báo", detail: "Thay đổi quyền người dùng thành công!", life: 3000 });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={cx("addproduct__container")}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className={cx("addproduct__header")}>
        <h1 className={cx("addproduct__header-title")}>Danh sách người dùng</h1>
      </div>
      <div className={cx("addproduct__body")}>
        <div className={cx("addproduct__action")}>
          <div className={cx("action-search")}>
            <GoSearch className={cx("action-search-icon")} />
            <input type="text" className={cx("action-search-input")} placeholder="Tìm kiếm tài khoản..." onChange={handleChange} />
          </div>
          <div className={cx("action-delete")}>
            {selectedAccounts.length > 0 ? (
              <>
                <FaTrashAlt />
                <button onClick={deleteSelectedAccounts}>Delete {selectedAccounts.length}</button>
              </>
            ) : null}
          </div>
        </div>
        <table className={cx("addproduct__table")}>
          <thead className={cx("table-head-list")}>
            <tr>
              <th className={cx("table-head-item")}>
                <input type="checkbox" className={cx("action-checkbox")} onChange={selectedAllAccounts} checked={selectedAccounts.length > 0} />
              </th>
              <th className={cx("table-head-item")}>Tên người dùng</th>
              <th className={cx("table-head-item")}>Email</th>
              <th className={cx("table-head-item")}>Thời gian tạo</th>
              <th className={cx("table-head-item")}>Tình trạng</th>
              <th className={cx("table-head-item")}>Quyền</th>
              <th className={cx("table-head-item")}>Thao tác</th>
            </tr>
          </thead>

          <tbody className={cx("table-body")}>
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <tr className={cx("product-item")} key={index}>
                  <td className={cx("action-checkbox")}>
                    <input 
                    disabled = {decodedToken.email ===account.email ? true : false}
                    type="checkbox" 
                    onChange={() => selectedAccount(account.email)} checked={selectedAccounts.includes(account.email)} />
                  </td>
                  <td>
                    <div className={cx("product-info")}>
                      {/* <img
                        src={
                          account.avatar
                            ? account.avatar
                            : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                        }
                        alt={account.email}
                        className={cx("product-img")}
                      /> */}
                      <div className={cx("product-info-detail")}>
                        <p className={cx("product-name")}>
                          <strong>{account.name}</strong>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={cx("product-info")}>
                      <div className={cx("product-info-detail")}>
                        <p className={cx("product-name")}>{account.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={cx("product-time")}>
                    <p className={cx("product-date")}>
                      <strong>{convertStringDate(account.createdAt).date}</strong>
                    </p>
                    <span className={cx("product-time-detail")}>{convertStringDate(account.createdAt).time}</span>
                  </td>
                  <td className={cx("product-status")}>{account?.status ? "active" : "inactive"}</td>
                  <td className={cx("product-status")}>
                    <Dropdown
                      defaultValue={account?.isAdmin == true ? "admin" : "customer"}
                      value={index == selectedIndex ? selectedState : account?.isAdmin == true ? "admin" : "customer"}
                      onChange={(e) => handleChangeState(e.value, account, index)}
                      options={roles}
                      placeholder="Tình trạng đơn hàng"
                      checkmark={true}
                      className="w-full md:w-14rem"
                      disabled={decodedToken.email ===account.email ? true : false}
                    />
                  </td>
                  <td className={cx("product-action")}>
                    <ul className={cx("product-action-list")}>
                      <li className={cx("product-action-item")} style={{display: decodedToken.email ===account.email ? "none" : "inline-block"}}>
                        <CiSquareRemove className={cx("icon", "icon-remove")} onClick={() => deleteAccount(account.email)} />
                        Remove
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <div>Chưa có tài khoản nào</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUsers;
