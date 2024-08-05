import { Link } from "react-router-dom";
import style from "./ProductCart.module.scss";
import className from "classnames/bind";
import { SlArrowRight } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../context/CartContextProvider";
import axiosClient from "../../config/axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
const cx = className.bind(style);

export default function ProductCart() {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const { cartItems, setCartItems, quantityInCart, setQuantityInCart } =
    useStateContext();
  const [productItem, setProductItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const tmpCartItems = cartItems
    ? [...new Set(cartItems.map((item) => item.productId))]
    : [];
  const [officialProducts, setOfficialProducts] = useState();
  const toast = useRef(null);

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Thông Báo",
      detail: "Đã hủy xóa sản phẩm",
      life: 3000,
    });
  };

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Thông Báo",
      detail: "Xóa sản phẩm thành công!",
      life: 3000,
    });
  };

  const handleDelete = (product) => {
    confirmDialog({
      message: "Bạn có muốn xóa sản phẩm này?",
      header: "Xác nhận xóa",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => removeFromCart(product),
      reject,
    });
  };

  const handleDeleteAll = () => {
    confirmDialog({
      message: "Bạn có muốn xóa tất cả sản phẩm được chọn?",
      header: "Xác nhận xóa",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteManyItems(),
      reject,
    });
  };

  const currentTime = new Date();

  const getSaleProducts = async () => {
    try {
      const month = currentTime.getMonth() + 1;
      const paddedMonth = month < 10 ? `0${month}` : month;
      const day = currentTime.getDate();
      const paddedDay = day < 10 ? `0${day}` : day;
      const response = await axiosClient.get(`/sale/get/${currentTime.getFullYear()}-${paddedMonth}-${paddedDay}`);
      const saleProducts = response.data;

      const itemInTabIndex0 = saleProducts.filter(saleProduct => saleProduct.saleHour === 0);
      const itemInTabIndex1 = saleProducts.filter(saleProduct => saleProduct.saleHour === 6);
      const itemInTabIndex2 = saleProducts.filter(saleProduct => saleProduct.saleHour === 12);
      const itemInTabIndex3 = saleProducts.filter(saleProduct => saleProduct.saleHour === 18);
      const productsCopy = [...productItem];

      if (0 <= currentTime.getHours() && currentTime.getHours() < 6) {
        for (let item of itemInTabIndex0) {
          for (let product of productsCopy) {
            if (item.productId === product._id) {
              product.discount = item.discountPercent;
            }
          }
        }
      }
      else if (6 <= currentTime.getHours() && currentTime.getHours() < 12) {
        for (let item of itemInTabIndex1) {
          for (let product of productsCopy) {
            if (item.productId === product._id) {
              product.discount = item.discountPercent;
            }
          }
        }
      }
      else if (12 <= currentTime.getHours() && currentTime.getHours() < 18) {
        for (let item of itemInTabIndex2) {
          for (let product of productsCopy) {
            if (item.productId === product._id) {
              product.discount = item.discountPercent;
            }
          }
        }
      }
      else if (18 <= currentTime.getHours() && currentTime.getHours() < 24) {
        for (let item of itemInTabIndex3) {
          for (let product of productsCopy) {
            if (item.productId === product._id) {
              product.discount = item.discountPercent;
            }
          }
        }
      }
      setOfficialProducts(productsCopy);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = (product) => {
    const tmp = [...cartItems];
    const newCartItems = tmp.filter(
      (item) =>
        !(
          item.productId === product.productId &&
          item.color === product.color &&
          item.size === product.size
        )
    );
    if (
      checkoutItems.some(
        (item) =>
          item.productId === product.productId &&
          item.color === product.color &&
          item.size === product.size
      )
    ) {
      removeCheckoutItem(product);
    }
    setCartItems(newCartItems)
    setQuantityInCart((prev) => prev - 1);
    axiosClient
      .delete("/cart/remove", {
        data: {
          productId: product.productId,
          color: product.color,
          size: product.size,
        },
      })
      .then((response) => {
        show();
        // getCartItems();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteManyItems = async () => {
    try {
      await axiosClient
        .delete("/cart/delete-many", { data: checkoutItems })
        .then((res) => {
          show();
          getCartItems();
          setCheckoutItems([]);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getCartItems = async () => {
    try {
      const response = await axiosClient.get(`/cart/get`);
      setQuantityInCart(response.data.quantity);
      setCartItems(response.data.products);
    } catch (error) {
      console.error("Đã có lỗi xảy ra", error);
    }
  };

  const getItemInCart = async (productId) => {
    try {
      const response = await axiosClient.get(
        `/getProductById/${productId}`
      );
      const newItem = response.data;
      setProductItem((prevProductItem) => [...prevProductItem, newItem]);
    } catch (error) {
      console.error("Đã có lỗi xảy ra", error);
    }
  };
  const getProductList = async () => {
    try {
      const productPromises = tmpCartItems.map((item) => getItemInCart(item));
      await Promise.all(productPromises);
    } catch (error) {
      console.error("Đã có lỗi xảy ra khi lấy danh sách sản phẩm", error);
    }
  };

  const getCart = () => {
    const newCart = [];
    for (let item of cartItems) {
      const product = officialProducts.find(
        (product) =>
          product._id === item.productId &&
          product.sizes.includes(item.size) &&
          product.images.some((img) => img.color === item.color)
      );
      if (product) {
        const img = product.images.find((img) => img.color === item.color);
        newCart.push({
          productId: item.productId,
          name: product.name,
          discount: product.discount,
          image: img.imgUrl,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        });
      }
    }
    setCart(newCart);
  };

  const calculateTotalPrice = () => {
    let total = checkoutItems.reduce((acc, item) => {
      return (
        acc + (item.price - (item.price * item.discount) / 100) * item.quantity
      );
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    getCartItems();
  }, [quantityInCart]);

  useEffect(() => {
    getProductList();
  }, [quantityInCart]);

  useEffect(() => {
    if (officialProducts) {
      getCart();
    }
  }, [officialProducts]);

  useEffect(() => {
    if (productItem) {
      getSaleProducts();
    }
  }, [productItem, quantityInCart]);

  useEffect(() => {
    calculateTotalPrice();
  }, [checkoutItems]);

  const handleIncreaseQuantity = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (
          item.productId === product.productId &&
          item.size === product.size &&
          product.color === item.color
        ) {
          axiosClient
            .put("/cart/updateQuantity", {
              productId: item.productId,
              color: item.color,
              quantity: item.quantity + 1,
              size: item.size,
            })
            .then((response) => {
              toast.current.show({
                severity: "success",
                summary: "Thông Báo",
                detail: "Tăng số lượng thành công!",
                life: 3000,
              });
              console.log(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      return updatedCart;
    });

    setCheckoutItems((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (
          item.productId === product.productId &&
          item.size === product.size &&
          product.color === item.color
        ) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCart;
    });
  };

  const handleDecreaseQuantity = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (
          item.productId === product.productId &&
          item.size === product.size &&
          product.color === item.color &&
          item.quantity > 1
        ) {
          axiosClient
            .put("/cart/updateQuantity", {
              productId: item.productId,
              color: item.color,
              quantity: item.quantity - 1,
              size: item.size,
            })
            .then((response) => {
              toast.current.show({
                severity: "success",
                summary: "Thông Báo",
                detail: "Giảm số lượng thành công!",
                life: 3000,
              });

              console.log(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updatedCart;
    });

    setCheckoutItems((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (
          item.productId === product.productId &&
          item.size === product.size &&
          product.color === item.color &&
          item.quantity > 1
        ) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return updatedCart;
    });
  };

  const handleSelectCartItem = (item) => {
    if (
      checkoutItems.some(
        (it) =>
          it.productId === item.productId &&
          it.color === item.color &&
          it.size === item.size
      )
    ) {
      removeCheckoutItem(item);
    } else {
      setCheckoutItems([...checkoutItems, item]);
    }
  };

  const removeCheckoutItem = (item) => {
    const tmp = [...checkoutItems];
    const newCheckout = tmp.filter(
      (it) =>
        !(
          it.productId === item.productId &&
          it.color === item.color &&
          it.size === item.size
        )
    );
    setCheckoutItems(newCheckout);
  };

  const handleSelectAll = () => {
    if (checkoutItems.length < cart.length) setCheckoutItems([...cart]);
    else setCheckoutItems([]);
  };

  return (
    <div className={cx("body-wrap")}>
      <ConfirmDialog style={{ width: "24vw" }} />
      <Toast ref={toast} />

      <div className={cx("main-cart-page")}>
        <div className={cx("container")}>
          <div className={cx("header-cart")}>
            <h1 className={cx("title-cart")}>GIỎ HÀNG CỦA BẠN</h1>
          </div>

          <div className={cx("body-cart")}>
            <div className={cx("cart-moblie-page")}>
              {cart ? (
                cart.length === 0 ? (
                  <div className={cx("cart-empty")}>
                    <div className={cx("cart-empty-icon")}>
                      <HiOutlineShoppingCart />
                    </div>
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                  </div>
                ) : (
                  <div className={cx("cartMobilePage")}>
                    <div className={cx("cart-mobile-body")}>
                      <div className={cx("cart-header-info")}>
                        <div className={cx("cart-check-box-header")}>
                          <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={
                              checkoutItems.length === cart.length
                                ? true
                                : false
                            }
                          />
                        </div>
                        {checkoutItems.length ? (
                          <button
                            className={cx("delete-many-container")}
                            onClick={handleDeleteAll}
                          >
                            <div>
                              <FaRegTrashAlt className={cx("icon-trash")} />
                              Xóa <span>{checkoutItems.length}</span>
                            </div>
                          </button>
                        ) : (
                          <></>
                        )}
                        <div className={cx("cart-header-info-ttsp")}>
                          THÔNG TIN SẢN PHẨM
                        </div>
                        <div className={cx("cart-header-info-price")}>
                          ĐƠN GIÁ
                        </div>
                        <div className={cx("cart-header-info-qty")}>
                          SỐ LƯỢNG
                        </div>
                        <div className={cx("cart-header-info-total")}>
                          THÀNH TIỀN
                        </div>
                      </div>
                      <div className={cx("cart-inner-body")}>
                        <div className={cx("cart-row")}>
                          {cart.map((item, index) => (
                            <div
                              className={cx("cart-row-product-cart")}
                              data-line={index}
                              key={index}
                            >
                              <div className={cx("cart-check-box")}>
                                <input
                                  type="checkbox"
                                  onChange={() => handleSelectCartItem(item)}
                                  checked={checkoutItems.some(
                                    (it) =>
                                      it.productId === item.productId &&
                                      it.color === item.color &&
                                      it.size === item.size
                                  )}
                                />
                              </div>
                              <Link
                                to="/"
                                className={cx("cart-product-image")}
                                title=""
                              >
                                <img src={item.image} alt={item.name}></img>
                              </Link>
                              <div className={cx("grid-item-info-detail")}>
                                <div className={cx("item-info-name")}>
                                  <Link
                                    to=""
                                    className={cx("item-info-name-link")}
                                  >
                                    {item.name}
                                  </Link>
                                  <div className={cx("item-info-size-color")}>
                                    <span className={cx("item-info-size")}>
                                      Size: {item.size}
                                    </span>
                                    <span className={cx("item-info-size")}>
                                      Màu: {item.color}
                                    </span>
                                  </div>

                                  <button
                                    className={cx("btn-remove-item-cart")}
                                    onClick={() => handleDelete(item)}
                                  >
                                    Xóa
                                  </button>
                                </div>
                                <div className={cx("grid-price")}>
                                  <div className={cx("grid-item-cart-price")}>
                                    <span className={cx("cart-price")}>
                                      {(
                                        (item.price -
                                          (item.price * item.discount) / 100) *
                                        1000
                                      ).toLocaleString("de-DE")}
                                      đ
                                    </span>
                                  </div>
                                </div>
                                <div className={cx("grid-qty")}>
                                  <div className={cx("grid-cart-select-item")}>
                                    <div
                                      className={cx(
                                        "grid-cart-select-group-btn"
                                      )}
                                    >
                                      <button
                                        className={cx("btn-adjust-qty-minus")}
                                        onClick={() =>
                                          handleDecreaseQuantity(item)
                                        }
                                      >
                                        {" "}
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        className={cx("number-sidebar")}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        value={item.quantity}
                                      />
                                      <button
                                        className={cx("btn-adjust-qty-plus")}
                                        onClick={() =>
                                          handleIncreaseQuantity(item)
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className={cx("grid-total")}>
                                  <div className={cx("grid-cart-price")}>
                                    <span className={cx("cart-price-total")}>
                                      {(
                                        (item.price -
                                          (item.price * item.discount) / 100) *
                                        1000 *
                                        item.quantity
                                      ).toLocaleString("de-DE")}
                                      đ
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={cx("cart-button")}>
                        <div className={cx("cart-subtotal")}>
                          <div className={cx("cart-subtotal-text")}>
                            Tổng tiền:
                          </div>
                          <div className={cx("cart-subtotal-price")}>
                            <div className={cx("total-price")}>
                              {totalPrice
                                ? (totalPrice * 1000).toLocaleString("de-DE")
                                : 0}
                              đ
                            </div>
                          </div>
                        </div>
                        <div className={cx("cart-btn-continue")}>
                          <Link className={cx("btn-checkout")} to="/products">
                            TIẾP TỤC MUA HÀNG
                          </Link>
                        </div>
                        <div className={cx("cart-btn-checkout")}>
                          {totalPrice > 0 ? (
                            <Link
                              to={"/checkout"}
                              state={{
                                totalPrice: totalPrice ? totalPrice : 0,
                                checkoutItems: [...checkoutItems],
                              }}
                              className={cx("cart-btn-proceed-checkout")}
                              id="btn-proceed-checkout"
                              title="Thanh toán"
                            >
                              THANH TOÁN
                            </Link>
                          ) : (
                            <div
                              className={cx(
                                "cart-btn-proceed-checkout-inactive"
                              )}
                              id="btn-proceed-checkout-inactive"
                              title="Thanh toán"
                            >
                              THANH TOÁN
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
            <div className={cx("discount-main-page")}>
              <div className={cx("pro-discount")}>
                <div className={cx("pro-discount-header")}>
                  <img
                    className={cx("pro-discount-icon")}
                    src="https://bizweb.dktcdn.net/100/451/884/themes/857425/assets/code_dis.gif?1706504358658%22"
                    alt="MÃ GIẢM GIÁ"
                  />
                  MÃ GIẢM GIÁ
                </div>
                <div className={cx("item-discount")}>
                  <div className={cx("top-discount")}>
                    <div className={cx("item-name")}>
                      <p className={cx("code-dis")}> 10% OFF</p>
                      <span className={cx("top-code")}> Top Code</span>
                    </div>
                    <img
                      className={cx("discount-icon")}
                      width="36"
                      height="20"
                      src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/coupon1_value_img.png?1706504358658"
                      alt="10% OFF"
                    />
                  </div>
                  <div className={cx("coupon-desc")}>
                    {" "}
                    Giảm
                    <b> 10% </b>
                    cho đơn hàng từ
                    <b> 500K.</b>
                  </div>
                  <div className={cx("copy-discount")}>
                    <p className={cx("code-zip")}>BFAS10</p>
                    <button
                      className={cx("btn-discount-copy")}
                      data-copy="BFAS10"
                    >
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                <div className={cx("item-discount")}>
                  <div className={cx("top-discount")}>
                    <div className={cx("item-name")}>
                      <p className={cx("code-dis")}> 15% OFF</p>
                    </div>
                    <img
                      className={cx("discount-icon")}
                      width="36"
                      height="20"
                      src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/coupon2_value_img.png?1706504358658"
                      alt="15% OFF"
                    />
                  </div>
                  <div className={cx("coupon-desc")}>
                    {" "}
                    Giảm
                    <b> 15% </b>
                    cho đơn hàng từ
                    <b> 900K.</b>
                  </div>
                  <div className={cx("copy-discount")}>
                    <p className={cx("code-zip")}>BFAS15</p>
                    <button
                      className={cx("btn-discount-copy")}
                      data-copy="BFAS15"
                    >
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                <div className={cx("item-discount")}>
                  <div className={cx("top-discount")}>
                    <div className={cx("item-name")}>
                      <p className={cx("code-dis")}> FREE SHIP</p>
                    </div>
                    <img
                      className={cx("discount-icon")}
                      width="36"
                      height="20"
                      src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/coupon3_value_img.png?1706504358658"
                      alt="FREE SHIP"
                    />
                  </div>
                  <div className={cx("coupon-desc")}>
                    <b> Free ship </b>
                    cho đơn hàng
                    <b> nội thành</b>
                  </div>
                  <div className={cx("copy-discount")}>
                    <p className={cx("code-zip")}>BFASFREE</p>
                    <button
                      className={cx("btn-discount-copy")}
                      data-copy="BFASFREE"
                    >
                      <span>Copy</span>
                    </button>
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
