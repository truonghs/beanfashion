import React, { useState, useEffect, useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";

import io from 'socket.io-client';

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import { CiCirclePlus } from "react-icons/ci";

import { Toast } from "primereact/toast";

import style from "./CheckOut.module.scss";
import className from "classnames/bind";

import { AuthContext } from "../../context/AuthContext";
import { useStateContext } from "../../context/CartContextProvider";
import axiosClient from "../../config/axios";
import AddAddressForm from "../../components/AddAddressForm/AddAddressForm";
const cx = className.bind(style);

const fetchAddresses = async () => {
  const { data } = await axiosClient.get("/user/address");
  return data;
};

const createOrder = async (orderInfo) => {
  const { data } = await axiosClient.post("/order/create", { orderInfo });
  return data;
};

const getVNPayUrl = async (payload) => {
  const { data } = await axiosClient.post("/order/vnpay/url", payload);
  return data;
};
function CheckOut() {
  const navigate = useNavigate();
  const { setCartItems, setQuantityInCart } = useStateContext();
  const { decodedToken } = useContext(AuthContext);
  const location = useLocation();
  const [totalPrice, setTotalPrice] = useState(
    location?.state?.totalPrice || null
  );
  const [checkoutItems, setCheckoutItems] = useState(
    location?.state?.checkoutItems || null
  );
  const [payment, setPayment] = useState("");
  const [address, setAddress] = useState(0);
  const [pickedAddress, setPickedAddress] = useState(true);
  const [pickedPayment, setPickedPayment] = useState(true);
  const [note, setNote] = useState("");
  const [hiddenForm, setHiddenForm] = useState(true);
  const toast = useRef(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery("addresses", fetchAddresses, {
    onSuccess: (data) => {
      setAddress(0);
    },
  });
  // get cart quantity
  const getCartItems = async () => {
    try {
      const response = await axiosClient.get(`/cart/get`);
     
      setQuantityInCart(response.data.quantity);
      setCartItems(response.data.quantity !== 0 ? response.data.products : []);
    } catch (error) {
      console.error("Đã có lỗi xảy ra", error);
    }
  };
  const createOrderMutation = useMutation(createOrder, {
    onSuccess: (data) => {
      // Dữ liệu trả về từ createOrder có sẵn ở đây dưới dạng 'data'
      console.log("Order created successfully:", data);
      getCartItems();
      queryClient.invalidateQueries("orders");
  
      const socket = io("http://localhost:3002");
      socket.emit("newOrder", data); // Gửi dữ liệu đơn hàng mới qua WebSocket
  
      setTimeout(() => {
        navigate("/order/success");
      }, 100);
    },
    onError: () => {
      console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
    },
  });

  const getVNPayUrlMutation = useMutation(getVNPayUrl, {
    onSuccess: (data) => {
      getCartItems();
      const socket = io("http://localhost:3002");
      socket.emit("newOrder", data.newOrder); // Gửi dữ liệu đơn hàng mới qua WebSocket
      window.open(data.vnpUrl, "_blank");
      navigate("/products");
      setTimeout(function () {
        window.close();
      }, 100);
    },
    onError: () => {
      console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
    },
  });

  const validate = () => {
    if (address === null) {
      setPickedAddress(false);
      return false;
    } else if (payment === "") {
      if (!pickedAddress) {
        setPickedAddress(true);
      }
      setPickedPayment(false);
      return false;
    } else if (!pickedAddress) {
      setPickedPayment(true);
    }
    return true;
  };

  const handleAddAddress = () => {
    setHiddenForm(false);
  };

  const handleCheckoutCOD = () => {
    const checkoutInfoTmp = {
      address: data?.addresses[address],
      note,
      paymentMethod: payment,
      isConfirmed: true,
      totalPrice: totalPrice + 40,
      products: checkoutItems,
      paid: false,
    };
    createOrderMutation.mutate(checkoutInfoTmp);
  };

  const handleCheckoutBanking = () => {
    const checkoutInfoTmp = {
      address: data?.addresses[address],
      note,
      paymentMethod: payment,
      isConfirmed: true,
      totalPrice: totalPrice + 40,
      products: checkoutItems,
      paid: false,
    };
    const amount = (totalPrice + 40) * 1000;
    const language = "vn";
    const bankCode = "";

    getVNPayUrlMutation.mutate({
      amount,
      language,
      bankCode,
      orderInfo: checkoutInfoTmp,
    });
  };

  const handleCheckout = () => {
    if (checkoutItems) {
      if (validate()) {
        if (payment === "banking") {
          handleCheckoutBanking();
        } else {
          handleCheckoutCOD();
        }
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Đơn hàng trống",
        life: 3000,
      });
    }
  };
  return (
    <div className={cx("main")}>
      <Toast ref={toast} />
      {!hiddenForm ? <div className={cx("isOverlay")}></div> : null}
      {!hiddenForm ? (
        <AddAddressForm hiddenForm={hiddenForm} setHiddenForm={setHiddenForm} />
      ) : null}
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("logoContainer")}>
            <div className={cx("logo")}>
              <img
                className={cx("logoImg")}
                src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/logo.png?1706504358658"
                alt="logo"
              />
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("order-info")}>
              <div className={cx("order-info-title")}>
                <h3 className={cx("order-info-titleTxt")}>
                  Thông tin nhận hàng
                </h3>
                {pickedAddress ? null : (
                  <div className={cx("warning")}>
                    Vui lòng chọn địa chỉ nhận hàng
                  </div>
                )}
              </div>

              <div className={cx("select-content")}>
                <div className={cx("inputField")}>
                  <div className={cx("small-title")}>Sổ địa chỉ</div>
                  <div className={cx("inputContainer")}>
                    {data?.addresses?.length > 0 ? (
                      <div className={cx("")}>
                        <select
                          onChange={(e) => setAddress(e.target.value)}
                          className={cx("input")}
                        >
                          {data?.addresses.map((address, index) => (
                            <option
                              value={index}
                              key={index}
                              className={cx("addressOtp")}
                            >
                              {address.name}, {address.detail}, {address.ward},{" "}
                              {address.district}, {address.province}
                            </option>
                          ))}
                        </select>
                        <div
                          onClick={(e) => handleAddAddress()}
                          className={cx("addAddressBtn")}
                        >
                          <div className={cx("addAddressBtnTxt")}>
                            <CiCirclePlus size={24} />
                            Thêm địa chỉ
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={(e) => handleAddAddress()}
                        className={cx("addAddressBtn")}
                      >
                        <div className={cx("addAddressBtnTxt")}>
                          <CiCirclePlus size={24} />
                          Thêm địa chỉ
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={cx("inputField")}>
                  <div className={cx("small-title")}>Email</div>
                  <div className={cx("inputContainer")}>
                    <input
                      className={cx("input")}
                      type="email"
                      defaultValue={decodedToken?.email}
                      disabled
                    ></input>
                  </div>
                </div>

                <div className={cx("inputField")}>
                  <div className={cx("small-title")}>Họ và tên</div>
                  <div className={cx("inputContainer")}>
                    <input
                      disabled
                      className={cx("input")}
                      type="text"
                      defaultValue={
                        data?.addresses && data?.addresses.length > 0
                          ? data?.addresses[address]?.name
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className={cx("inputField")}>
                  <div className={cx("small-title")}>Số điện thoại</div>
                  <div className={cx("inputContainer")}>
                    <input
                      disabled
                      defaultValue={
                        data?.addresses && data?.addresses.length > 0
                          ? data?.addresses[address]?.phoneNumber
                          : ""
                      }
                      className={cx("input")}
                      type="text"
                      placeholder={"Số điện thoại (tuỳ chọn)"}
                    ></input>
                  </div>
                </div>

                <div className={cx("inputField")}>
                  <div className={cx("small-title")}>Ghi chú</div>
                  <div className={cx("inputContainer")}>
                    <textarea
                      onChange={(e) => setNote(e.target.value)}
                      className={cx("textArea")}
                      name="note"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("transfer-checkout")}>
              <div className={cx("checkout-title")}>
                <h3 className={cx("checkout-info-titleTxt")}>
                  Phương thức thanh toán
                </h3>
                {pickedPayment ? null : (
                  <div className={cx("warning")}>
                    Vui lòng chọn phương thức thanh toán
                  </div>
                )}
              </div>
              <div
                onClick={(e) => setPayment("cod")}
                className={cx(
                  "checkout-option",
                  payment === "cod" ? "checkout-option-active" : null
                )}
              >
                <div className={cx("codCheck")}>
                  <input
                    checked={payment === "cod" ? true : false}
                    value={"cod"}
                    name="paymentMethod"
                    className={cx("checkout-checkbox")}
                    type="radio"
                    readOnly
                  ></input>
                  <div className={cx("option-text")}>
                    Thanh toán khi giao hàng (COD)
                  </div>
                </div>
                <div className={cx("option-icon")}>
                  <FaRegMoneyBillAlt
                    color={payment === "cod" ? "#009e61" : null}
                    size={30}
                  />
                </div>
              </div>
              <div
                onClick={(e) => setPayment("banking")}
                className={cx(
                  "checkout-option",
                  payment === "banking" ? "checkout-option-active" : null
                )}
              >
                <div className={cx("codCheck")}>
                  <input
                    className={cx("checkout-checkbox")}
                    checked={payment === "banking" ? true : false}
                    value={"banking"}
                    name="paymentMethod"
                    type="radio"
                    readOnly
                  ></input>
                  <div className={cx("option-text")}>Thanh toán trực tuyến</div>
                </div>
                <div className={cx("option-icon")}>
                  <BsBank2
                    color={payment === "banking" ? "#009e61" : null}
                    size={30}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("checkout-side")}>
          <div className={cx("quantity")}>
            <h3 className={cx("checkoutTitle")}>
              Đơn hàng ({checkoutItems?.length} sản phẩm)
            </h3>
          </div>
          <div className={cx("checkoutProductsContainer")}>
            {checkoutItems?.map((checkoutItem, index) => (
              <div key={index} className={cx("productField")}>
                <div className={cx("productLine")}></div>
                <div className={cx("productInfo")}>
                  <div className={cx("productImgContainer")}>
                    <img
                      src={checkoutItem.image}
                      className={cx("productImg")}
                    ></img>
                  </div>
                  <div className={cx("productContent")}>
                    <div className={cx("productDesc")}>
                      <div className={cx("productName")}>
                        {checkoutItem.name}
                      </div>
                      <div className={cx("flex")}>
                        <div className={cx("sizeAndColor")}>
                          Size: {checkoutItem.size}, Màu: {checkoutItem.color}
                        </div>
                      </div>
                    </div>
                    <div className={cx("priceField")}>
                      <div className={cx("price")}>
                        {(
                          (checkoutItem.price -
                            (checkoutItem.price * checkoutItem.discount) /
                              100) *
                          1000
                        ).toLocaleString("de-DE")}
                        đ
                        {/* {checkoutItem.price > 1000
                          ? Math.floor(checkoutItem.price / 1000) + "." + (checkoutItem.price % 1000 > 100 ? checkoutItem.price % 1000 : "0" + (checkoutItem.price % 1000))
                          : checkoutItem.price}
                        .000đ */}
                      </div>
                      <div className={cx("productQuantity")}>
                        x{checkoutItem.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={cx("fullWidthLine")}></div>
          <div className={cx("voucherContainer")}>
            <input
              placeholder="Nhập mã giảm giá"
              className={cx("voucherInput")}
            ></input>
            <div className={cx("voucherBtn")}>Áp dụng</div>
          </div>
          <div className={cx("fullWidthLine")}></div>
          <div className={cx("totalContainer")}>
            <div className={cx("tmpContainer")}>
              <div className={cx("tmpCount")}>
                <div className={cx("tmpCountTitle")}>Tạm tính</div>
                <div className={cx("tmpCountValue")}>
                  {(totalPrice * 1000).toLocaleString("de-DE")}đ
                  {/* {totalPrice > 1000 ? Math.floor(totalPrice / 1000) + "." + (totalPrice % 1000 > 100 ? totalPrice % 1000 : "0" + (totalPrice % 1000)) : totalPrice}.000đ */}
                </div>
              </div>
              <div className={cx("shippingCostContainer")}>
                <div className={cx("shippingCostTitle")}>Phí vận chuyển</div>
                <div className={cx("shippingCostValue")}>40.000đ</div>
              </div>
            </div>
            <div className={cx("fullWidthLine")}></div>

            <div className={cx("finalContainer")}>
              <div className={cx("finalPrice")}>
                <div className={cx("finalTitle")}>Tổng cộng</div>
                <div className={cx("finalValue")}>
                  {((totalPrice + 40) * 1000).toLocaleString("de-DE")}đ
                  {/* {totalPrice + 40 > 1000
                    ? Math.floor((totalPrice + 40) / 1000) + "." + ((totalPrice + 40) % 1000 > 100 ? (totalPrice + 40) % 1000 : "0" + ((totalPrice + 40) % 1000))
                    : totalPrice + 40}
                  .000đ */}
                </div>
              </div>
              <div className={cx("finalOptContainer")}>
                <Link to={"/cart"} className={cx("backBtn")}>
                  <TiArrowBackOutline color="blue" /> Quay về giỏ hàng
                </Link>
                <div onClick={handleCheckout} className={cx("orderBtn")}>
                  ĐẶT HÀNG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
