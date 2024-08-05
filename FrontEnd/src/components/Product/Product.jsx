import React from "react";
import styles from "./Product.module.scss";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import className from "classnames/bind";
const cx = className.bind(styles);

export default function Product({ product, ranking, newPrice, productCount, productCountSale, discount, handleClickCart, handleClickEye }) {
  return (
    <>
      {product ? (
        <>
          <div className={cx("product-thumbnail")}>
            <Link className={cx("product-overlay")}></Link>
            <Link className={cx("image-thumbnail", "no-underline")}>
              <img className={cx("lazyload", "loaded")} src={product?.images[0]?.imgUrl} alt={product.name} />
            </Link>
            {discount && <span className={cx("sale")}>{-product.discount}%</span>}
            {ranking ? (
              <div className={cx("product-index-num")}>
                <span className={cx("cri_index")}></span>
                <span className={cx("number_index")}>#{ranking}</span>
              </div>
            ) : null}
            <div className={cx("product-action")}>
              <Link className={cx("product-overlay-action")}></Link>
              <div className={cx("group-action")}>
                <Link to={`/product/detail/${product.slug}`}>
                  <CiSettings className={cx("icon")} title="" />
                </Link>
                <IoEyeOutline className={cx("icon")} title="Xem trước" onClick={handleClickEye} />
                <HiOutlineShoppingBag className={cx("icon")} title="Thêm vào giỏ" onClick={handleClickCart} />
              </div>
            </div>
          </div>
          <div className={cx("product-info")}>
            <Link className={cx("no-underline")} to={`/product/detail/${product.slug}`}>
              <h3 className={cx("product-name")}>{product.name}</h3>
            </Link>
            <div className={cx("price-box")}>
              {discount ? (
                <>
                  <span className={cx("price")}>{((product.price - (product.price * product.discount) / 100) * 1000).toLocaleString("de-DE")}₫</span>
                  <span className={cx("compare-price")}>{(product.price * 1000).toLocaleString("de-DE")}₫</span>
                </>
              ) : (
                <span className={cx("price")}>{(product.price * 1000).toLocaleString("de-DE")}₫</span>
              )}
              {productCount && (
                <div className={cx("productcount")}>
                  <div className={cx("countitem", "visible")}>
                    <span className={cx("a-center")}>Đã bán {product.sold}</span>
                    <div className={cx("countdown")}>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {productCountSale && (
              <div className={cx("productcount-sale")}>
                <div className={cx("countitem", "visible")}>
                  <span className={cx("a-center")}>Đã bán {product.saleCount}</span>
                  <div className={cx("countdown")}>
                    <span></span>
                  </div>
                  <div className={cx("sale-bar")}></div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
