import React, { useContext, useState, useRef } from "react";
import style from "./ProductMainInfo.module.scss";
import className from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { Navigation } from "swiper/modules";
import "swiper/scss/navigation";
import { useStateContext } from "../../context/CartContextProvider";
import axiosClient from "../../config/axios";
import { AuthContext } from "../../context/AuthContext";
import { Toast } from "primereact/toast";

const cx = className.bind(style);

export default function ProductMainInfo({
  product,
  addToCartSuccess,
  addToCartFail,
}) {
  const { isAuth } = useContext(AuthContext);
  const toast = useRef(null);
  const { cartItems, setCartItems, setQuantityInCart } = useStateContext();
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const switchMainImg = (index) => {
    setMainImgIndex(index);
  };
  const [width, setWidth] = useState(window.innerWidth);
  const [count, setCount] = useState(1);
  const giamSoLuong = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const tangSoLuong = () => {
    setCount(count + 1);
  };

  const [activeColor, setActiveColor] = useState(0);
  const changeActiveColor = (index) => {
    setActiveColor(index);
  };

  const [activeSize, setActiveSize] = useState(0);
  const changeActiveSize = (index) => {
    setActiveSize(index);
  };

  const handleAddToCart = async () => {
    if (isAuth) {
      if (product.stock.find(it => it.color === product.colors[activeColor].colorName && it.size === product.sizes[activeSize]).quantity === 0) {
        toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xin lỗi! Sản phẩm này đã bán hết', life: 3000 });
        return;
    }

    if (product.stock.find(it => it.color === product.colors[activeColor].colorName && it.size === product.sizes[activeSize]).quantity < count) {
        return toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xin lỗi! Vượt quá số lượng trong kho!', life: 3000 });
    }

      const data = {
        products: {
          productId: product._id,
          size: product.sizes[activeSize],
          color: product.colors[activeColor].colorName,
          quantity: parseInt(count),
          price: product.price,
        },
      };

      axiosClient
        .post("/cart/add", data)
        .then((response) => {
          console.log(response.data.message);
          addToCartSuccess();
          setQuantityInCart(response.data.quantity);
          const tmp = [...cartItems];

          const existingItemIndex = cartItems.findIndex(
            (item) =>
              item.productId === data.products.productId &&
              item.size === data.products.size &&
              item.color === data.products.color
          );

          if (existingItemIndex !== -1) {
            tmp[existingItemIndex].quantity += parseInt(data.products.quantity);
          } else {
            tmp.push(data.products);
          }
          setCartItems(tmp);
        })
        .catch((err) => {
          addToCartFail();
          console.log(err);
        });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Bạn chưa đăng nhập",
        life: 3000,
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      {product && (
        <div className={cx("ProductMainInfo-container")}>
          <div className={cx("small-container")}>
            <div className={cx("left-image")}>
              <div className={cx("main-image")}>
                <img src={product.images[mainImgIndex].imgUrl} />
              </div>
              <div className={cx("small-images")}>
                <Swiper
                  spaceBetween={10}
                  slidesPerView={4}
                  // centeredSlides
                  modules={[Navigation]}
                  navigation
                  className={cx("swiper-wrapper")}
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className={cx("each-swiper-wrapper")}
                    >
                      <div
                        className={cx("each-small-img")}
                        onClick={() => switchMainImg(index)}
                      >
                        <img
                          src={image.imgUrl}
                          alt="Áo cotton nữ cổ trong dáng suông in chữ"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className={cx("right-info")}>
              <h2 className={cx("title")}>{product.name}</h2>
              <div className={cx("code-tradeMark-stock")}>
                <p className={cx("product-code")}>
                  Mã:
                  <span className={cx("code", "co-tra-st")}>{product._id}</span>
                </p>
                <div className={cx("tradeMark-stock")}>
                  <p className={cx("product-tradeMark")}>
                    Thương hiệu:
                    <span className={cx("tradeMark", "co-tra-st")}>
                      BeanFashion
                    </span>
                  </p>
                  <p className={cx("co-tra-st", "separate")}>|</p>
                  <p className={cx("product-stock")}>
                    Tình trạng:
                    <span className={cx("stock", "co-tra-st")}>Còn hàng</span>
                  </p>
                </div>
              </div>
              <div className={cx("product-price")}>
                <h3 className={cx("new-price")}>
                  {
                    ((product.price - (product.price * product.discount) / 100) * 1000).toLocaleString('de-DE')
                  }
                  {/* {Math.floor(
                    product.price - (product.price * product.discount) / 100
                  ).toLocaleString("vi-VN")}
                  .000 */}
                  <span className={cx("currency-symbols")}>₫</span>
                </h3>
                <h3 className={cx("old-price")}>
                  {product.discount > 0 ? (
                    <>
                      {(product.price * 1000).toLocaleString('de-DE')}
                      <span className={cx("currency-symbols")}>₫</span>
                    </>
                  ) : (
                    ""
                  )}
                </h3>
              </div>
              <p className={cx("short-descripions")}>{product.shortDesc}</p>
              <div className={cx("color-picker")}>
                <p>
                  Màu sắc:
                  <span className={cx("picked-color")}>
                    {product.colors[activeColor].colorName}
                  </span>
                </p>
                <div className={cx("all-color")}>
                  {product.colors.map((color, index) => (
                    <button
                      className={cx("each-color")}
                      style={{ backgroundColor: color.colorCode }}
                      onClick={() => {
                        changeActiveColor(index);
                      }}
                    >
                      <div
                        className={cx(
                          activeColor === index
                            ? "active-color"
                            : "invisible-color"
                        )}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>
              <div className={cx("size-picker")}>
                <p>
                  Kích thước:{" "}
                  <span className={cx("picked-size")}>
                    {product.sizes[activeSize]}
                  </span>
                </p>
                <div className={cx("all-size")}>
                  {product.sizes.map((size, index) => (
                    <div
                      className={cx(
                        activeSize === index ? "active-size" : "each-size"
                      )}
                      onClick={() => changeActiveSize(index)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              <div className={cx("size-recommend")}>
                <img
                  src={require("../../assets/image/size_icon.png")}
                  alt="size"
                />
                <span className={cx("")}>Gợi ý tìm size</span>
              </div>
              <div className={cx("count-addToCart")}>
                <div className={cx("count-picker")}>
                  <button onClick={giamSoLuong} className={cx("count-button")}>
                    -
                  </button>
                  <input
                    type="text"
                    value={count}
                    className={cx("count-value")}
                  />
                  <button onClick={tangSoLuong} className={cx("count-button")}>
                    +
                  </button>
                </div>
                <div className={cx("add-to-card")}>
                  <button
                    onClick={handleAddToCart}
                    className={cx("add-to-card-button")}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
