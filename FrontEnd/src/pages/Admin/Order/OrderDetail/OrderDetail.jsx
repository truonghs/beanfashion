import style from "./OrderDetail.module.scss";
import className from "classnames/bind";
import { IoIosArrowForward } from "react-icons/io";
import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axiosClient from "../../../../config/axios";
const cx = className.bind(style);

function OrderDetail() {
 
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    axiosClient
      .get(`/order/get`, { params: { orderId: orderId } })
      .then(({ data }) => {
        setOrder(data.order);
        console.log(data.order);
      })
      .catch((error) => {
        console.log("Đã có lỗi xãy ra, vui lòng thử lại!");
      });
  }, []);

  const date = new Date(order?.createdAt);
  return (
    <div className={cx("content")}>
      <div className={cx("wrapper")}>
        <div className={cx("main")}>
          <div className={cx("content-title", "flex")}>
            <div className={cx("title")}>Chi tiết đơn hàng #{orderId}</div>
            <div className={cx("create-date")}>
              Ngày tạo: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </div>
          </div>

          <div className={cx("order-status", "flex")}>
            <div className={cx("statusContainer", "flex")}>
              <div className={cx("statusTitle")}>Trạng thái thanh toán:</div>
              <div className={order?.paid ? cx("paymentStatusContent") : cx("paymentStatusContent", "warning")}>{order?.paid ? "Đã thanh toán" : "Chưa thanh toán"}</div>
            </div>
            <div className={cx("statusContainer", "statusRight", "flex")}>
              <div className={cx("statusTitle")}>Trạng thái vận chuyển:</div>
              <div className={cx("deliveryStatusContent")}>Chưa vận chuyển</div>
            </div>
          </div>

          <div className={cx("order-info", "flex")}>
            <div className={cx("order-address")}>
              <div className={cx("order-info-title")}>ĐỊA CHỈ GIAO HÀNG</div>
              <div className={cx("orderInfoBorder")}>
                <div className={cx("user-name")}>{order?.address?.name}</div>
                <div className={cx("user-address")}>
                  Địa chỉ: {order?.address?.detail}, {order?.address?.ward}, {order?.address?.district}, {order?.address?.province}
                </div>
                <div className={cx("user-phonenum")}>SĐT: {order?.address?.phoneNumber}</div>
              </div>
            </div>
            <div className={cx("order-checkout")}>
              <div className={cx("order-info-title")}>THANH TOÁN</div>
              <div className={cx("orderInfoBorder")}>
                <div>{order?.paymentMethod === "cod" ? "Thanh toán khi nhận hàng (COD)" : "Thanh toán trực tuyến"}</div>
                {order?.paymentMethod === "banking" && order?.paid == false ? (
                  <div className={cx("checkOutBtnInactive")}>CHƯA THANH TOÁN</div>
                ) : order?.paymentMethod === "banking" && order?.paid == true ? (
                  <div className={cx("checkOutBtn")}>ĐÃ THANH TOÁN</div>
                ) : (
                  <div className={cx("checkOutBtnInactive")}>CHƯA THANH TOÁN</div>
                )}
              </div>
            </div>
            <div className={cx("order-note")}>
              <div className={cx("order-info-title")}>GHI CHÚ</div>
              <div className={cx("orderInfoBorder")}>
                <div>{order?.note ? order?.note : "Không có ghi chú"}</div>
              </div>
            </div>
          </div>
          <div className={cx("orderTable")}>
            <div className={cx("orderTableHeading", "flex")}>
              <div className={cx("orderTableHeadingItem", "productCol")}>
                <div className={cx("orderTableHeadingTxt")}>Sản phẩm</div>
              </div>
              <div className={cx("orderTableHeadingItem", "priceCol")}>
                <div className={cx("orderTableHeadingTxt")}>Đơn giá</div>
              </div>
              <div className={cx("orderTableHeadingItem", "quantityCol")}>
                <div className={cx("orderTableHeadingTxt")}>Số lượng</div>
              </div>
              <div className={cx("orderTableHeadingItem", "totalCol")}>
                <div className={cx("orderTableHeadingTxt")}>Tổng tiền</div>
              </div>
            </div>
            <div className={cx("orderTableProductsContainer", "flex")}>
              {order?.products?.map((product, index) => (
                <div className={cx("productItemContainer")}>
                  <div className={cx("productsItem", "flex")}>
                    <div className={cx("productCol", "flex")}>
                      <div className={cx("productImgContainer")}>
                        <img className={cx("productImg")} src={product.image}></img>
                      </div>
                      <div className={cx("productDetail", "flex")}>
                        <div className={cx("productName")}>
                          <div className={cx("productNameTxt")}>{product.name}</div>
                        </div>
                        <div className={cx("productSpecs", "flex")}>
                          <div className={cx("productSize")}>{product.size}</div>
                          <div className={cx("productSpecsLine")}>|</div>
                          <div className={cx("productColor")}>{product.color}</div>
                        </div>
                      </div>
                    </div>
                    <div className={cx("priceCol")}>
                      <div className={cx("priceValue")}>
                        <div className={cx("priceTxt")}>
                          {
                            (product.price*1000).toLocaleString('de-DE')
                          }đ
                          {/* {product.price > 1000 ? Math.floor(product.price / 1000) + "." + (product.price % 1000) : product.price}.000đ */}
                          </div>
                      </div>
                    </div>
                    <div className={cx("quantityCol")}>
                      <div className={cx("quantityValue")}>
                        <div className={cx("quantityTxt")}>{product.quantity}</div>
                      </div>
                    </div>
                    <div className={cx("totalCol")}>
                      <div className={cx("totalValue")}>
                        <div className={cx("totalTxt")}>
                          {
                            (product.price * product.quantity * 1000).toLocaleString('de-DE')
                          }đ
                          {/* {product.price * product.quantity > 1000
                            ? Math.floor((product.price * product.quantity) / 1000) + "." + ((product.price * product.quantity) % 1000)
                            : product.price * product.quantity}
                          .000đ */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {order?.products?.length - 1 > index ? <div className={cx("line")}></div> : null}
                </div>
              ))}
            </div>
            <div className={cx("orderTableFinal", "flex")}>
              <div className={cx("padding")}></div>
              <div className={cx("orderTableFinalContent", "flex")}>
                <div className={cx("finalCol")}>
                  <div className={cx("shippingTitle")}>Phí vận chuyển</div>
                  <div className={cx("finalPriceTitle")}>Tổng tiền</div>
                </div>
                <div className={cx("finalValueCol")}>
                  <div className={cx("shippingValue")}>40.000đ</div>
                  <div className={cx("finalPriceValue")}>
                    {
                      (order.totalPrice * 1000).toLocaleString('de-DE')
                    }đ
                    {/* {order.totalPrice > 1000 ? Math.floor(order.totalPrice / 1000) + "." + (order.totalPrice % 1000) : order.totalPrice}.000đ */}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
