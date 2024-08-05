import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { FaGift } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

import "swiper/scss";
import "swiper/scss/navigation";
import classNames from "classnames/bind";
import style from "./ProductDetail.module.scss";

import Product from "../../components/Product/Product";
import ProductMainInfo from "../../components/ProductMainInfo/ProductMainInfo";
import QuickViewInfo from "../../components/QuickViewInfo/QuickViewInfo";
import axiosClient from "../../config/axios";
import { Toast } from "primereact/toast";
import AddToCartPopup from "../../components/AddToCartPopup/AddToCartPopup";
import QuickViewPopup from "../../components/QuickViewPopup/QuickViewPopup";

const cx = classNames.bind(style);

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState();
  const [officialProduct, setOfficialProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();
  const [relatedProductsOfficial, setRelatedProductsOfficial] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const toast = useRef(null);

  const error = () => {
    toast.current.show({
      severity: "error",
      summary: "Lỗi",
      detail: "Thêm sản phẩm thất bại",
      life: 3000,
    });
  };

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Thành công",
      detail: "Thêm sản phẩm vào giỏ hàng thành công!",
      life: 3000,
    });
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const tabs = ["Mô tả sản phẩm", "Chính sách đổi trả"]; // Danh sách các tab
  useEffect(() => {
    async function fetchData() {
      await axiosClient
        .get(`/product/detail/${slug}`)
        .then(({ data }) => {
          setProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [slug]);

  const currentTime = new Date();
  const getSaleProducts = async () => {
    try {
      const month = currentTime.getMonth() + 1;
      const paddedMonth = month < 10 ? `0${month}` : month;
      const day = currentTime.getDate();
      const paddedDay = day < 10 ? `0${day}` : day;
      const response = await axiosClient.get(`/sale/get/${currentTime.getFullYear()}-${paddedMonth}-${paddedDay}`);
      const saleProducts = response.data;

      const productCopy = { ...product };

      const itemInTabIndex0 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 0);
      const itemInTabIndex1 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 6);
      const itemInTabIndex2 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 12);
      const itemInTabIndex3 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 18);

      if (0 <= currentTime.getHours() && currentTime.getHours() < 6) {
        for (let item of itemInTabIndex0) {
          if (item.productId === productCopy?._id) {
            productCopy.discount = item.discountPercent;
          }
        }
      }
      else if (6 <= currentTime.getHours() && currentTime.getHours() < 12) {
        for (let item of itemInTabIndex1) {
          if (item.productId === productCopy?._id) {
            productCopy.discount = item.discountPercent;
          }
        }
      } else if (12 <= currentTime.getHours() && currentTime.getHours() < 18) {
        for (let item of itemInTabIndex2) {
          if (item.productId === productCopy?._id) {
            productCopy.discount = item.discountPercent;
          }
        }
      } else if (18 <= currentTime.getHours() && currentTime.getHours() < 24) {
        for (let item of itemInTabIndex3) {
          if (item.productId === productCopy?._id) {
            productCopy.discount = item.discountPercent;
          }
        }
      }
      setOfficialProduct(productCopy);
    } catch (error) {
      console.error(error);
    }
  };

  const getSaleRelatedProducts = async () => {
    try {
      const month = currentTime.getMonth() + 1;
      const paddedMonth = month < 10 ? `0${month}` : month;
      const day = currentTime.getDate();
      const paddedDay = day < 10 ? `0${day}` : day;
      const response = await axiosClient.get(`/sale/get/${currentTime.getFullYear()}-${paddedMonth}-${paddedDay}`);
      const saleProducts = response.data;

      const relatedProductsCopy = [...relatedProducts];

      const itemInTabIndex0 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 0);
      const itemInTabIndex1 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 6);
      const itemInTabIndex2 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 12);
      const itemInTabIndex3 = saleProducts.filter((saleProduct) => saleProduct.saleHour === 18);

      if (0 <= currentTime.getHours() && currentTime.getHours() < 6) {
        for (let item of itemInTabIndex0) {
          for (let prod of relatedProductsCopy) {
            if (item.productId === prod._id) {
              prod.discount = item.discountPercent;
            }
          }
        }
      }
      else if (6 <= currentTime.getHours() && currentTime.getHours() < 12) {
        for (let item of itemInTabIndex1) {
          for (let prod of relatedProductsCopy) {
            if (item.productId === prod._id) {
              prod.discount = item.discountPercent;
            }
          }
        }
      } else if (12 <= currentTime.getHours() && currentTime.getHours() < 18) {
        for (let item of itemInTabIndex2) {
          for (let prod of relatedProductsCopy) {
            if (item.productId === prod._id) {
              prod.discount = item.discountPercent;
            }
          }
        }
      } else if (18 <= currentTime.getHours() && currentTime.getHours() < 24) {
        for (let item of itemInTabIndex3) {
          for (let prod of relatedProductsCopy) {
            if (item.productId === prod._id) {
              prod.discount = item.discountPercent;
            }
          }
        }
      }
      setRelatedProductsOfficial(relatedProductsCopy);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    async function fetchData() {
      if (product?.category?.categoryType) {
        await axiosClient
          .get(`/products?keyword=${product?.category?.categoryDetail}`)
          .then(({ data }) => {
            setRelatedProducts(data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    fetchData();
    if (product)
      getSaleProducts()
  }, [product]);

  useEffect(() => {
    if (relatedProducts) {
      getSaleRelatedProducts()
    }
  }, [relatedProducts])
  const tabContents = [
    <div
      className={cx("description")}
      dangerouslySetInnerHTML={{ __html: product?.description }}
    ></div>,

    <div className={cx("policy")}>
      + Sản phẩm lỗi, hỏng do quá trình sản xuất hoặc vận chuyện
      <br />
      + Nằm trong chính sách đổi trả sản phẩm của Bean
      <br />
      + Sản phẩm còn nguyên tem mác chưa qua sử dụng và chưa giặt là
      <br />
      + Thời gian đổi trả nhỏ hơn 15 ngày kể từ ngày nhận hàng
      <br />
      + Chi phí bảo hành về sản phẩm, vận chuyển khách hàng chịu chi phí <br />
      <b>Điều kiện đổi trả hàng</b>
      <br />
      Điều kiện về thời gian đổi trả: trong vòng 01 ngày kể từ khi nhận được hàng và phải liên hệ gọi ngay cho chúng tôi theo số điện thoại trên để được xác nhận đổi trả hàng.
      <br />
      <b>Điều kiện đổi trả hàng:</b>
      <br />
      - Sản phẩm gửi lại phải còn nguyên đai nguyên kiện
      <br />
      - Phiếu bảo hành (nếu có) và tem của công ty trên sản phẩm còn nguyên vẹn.
      <br />
      - Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy Hướng dẫn sử dụng và chưa qua sử dụng.
      <br />- Quý khách chịu chi phí vận chuyển, đóng gói, thu hộ tiền, chi phí liên lạc tối đa tương đương 20% giá trị đơn hàng.
    </div>,
  ];

  const textRefs = [useRef(null), useRef(null), useRef(null)];

  const copyToClipboard = (index) => {
    if (textRefs[index].current) {
      const textToCopy = textRefs[index].current.innerText;
      navigator.clipboard.writeText(textToCopy);
      // alert("Mã đã được sao chép vào clipboard!");
    }
  };

  const [hidePopup, setHidePopup] = useState(true);
  const [cartProduct, setCartProduct] = useState()
  const [showPopupQuickView, setShowPopupQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState()
  const handleClickCart = (product = {}) => {
    setCartProduct(product)
    setHidePopup(!hidePopup);
  };

  const handleClickEye = (product = {}) => {
    setQuickViewProduct(product)
    setShowPopupQuickView(!showPopupQuickView);
  }
  return (
    <>
      <Toast ref={toast} />
      {showPopupQuickView &&
        <QuickViewPopup
          product={quickViewProduct}
          togglePopupQuickView={() => setShowPopupQuickView(prevState => !prevState)}
          addToCartSuccess={show}
          addToCartFail={error}
        />}
      {!hidePopup && <div className={cx("cart-popup-backdrop")}></div>}
      {!hidePopup &&
        <AddToCartPopup
          product={cartProduct}
          togglePopup={() => setHidePopup(prevState => !prevState)}
          addToCartSuccess={show}
          addToCartFail={error}
        />}
      <div className={cx("set-z-index")}>{isPopupOpen && <QuickViewInfo openPopup={openPopup} />}</div>
      <div className={cx("container")}>
        {/* Thanh tiêu đề (điều hướng) */}

        <div className={cx("small-container")}>
          <div className={cx("product-detail-side")}>
            {/* Chi tiết sản phẩm chính */}
            {officialProduct ?
              (
                <ProductMainInfo
                  product={officialProduct}
                  addToCartFail={error}
                  addToCartSuccess={show}
                />
              ) : <></>}
            {/* Mô tả và chính sách */}
            <div className={cx("description-policy")}>
              <div>
                <div className={cx("tabs")}>
                  {tabs.map((tab, index) => (
                    <button key={index} className={cx(index === activeTab ? ("tab", "active") : "tab")} onClick={() => handleTabClick(index)}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className={cx("tab-content")}>{tabContents[activeTab]}</div>
              </div>
            </div>

            {/* Các sản phẩm liên quan */}
            <section className={cx("trending")}>
              <div className={cx("container-trending")}>
                <div className={cx("box-container")}>
                  <div className={cx("title")}>
                    <h2>Sản phẩm liên quan</h2>
                  </div>
                  <div className={cx("tab-products-container")}>
                    <div className={cx("tab-products")}>
                      <div className={cx("tab-content-trending", "tab-category")}>
                        <div className={cx("box-container-swiper")}>
                          <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            // slidesPerView={width > 768 ? 4 : 2}
                            modules={[Navigation]}
                            navigation
                          >
                            {relatedProductsOfficial ? relatedProductsOfficial.map((product, productIndex) => (
                              <SwiperSlide
                                key={productIndex}
                                className={cx("product-container")}
                              >
                                <Product
                                  product={product}
                                  discount={product.discount ? true : false}
                                  handleClickEye={() => handleClickEye(product)}
                                  handleClickCart={() => handleClickCart(product)}
                                  openPopup={openPopup}
                                />
                              </SwiperSlide>
                            )) : <></>}
                          </Swiper>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className={cx("right-features-side")}>
            {/* Các mã giảm giá */}
            <div className={cx("discount-code")}>
              <fieldset className={cx("pro-discount")}>
                <legend className={cx("pro-discount__legend")}>
                  <FaGift color="red" className={cx("pro-discount__gift-icon")} />
                  MÃ GIẢM GIÁ
                </legend>
                <div className={cx("item_discount")}>
                  <div className={cx("top_discount")}>
                    <div className={cx("item-name")}>
                      <p className={cx("code_dis")}>10% OFF</p>
                      <span>Top Code</span>
                    </div>
                    <img width={36} height={20} src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/coupon1_value_img.png?1706504358658" alt="10% OFF" />
                  </div>
                  <div className={cx("coupon_desc")}>
                    Giảm <b>10%</b> cho đơn hàng từ <b>500k.</b>
                  </div>
                  <div className={cx("copy_discount")}>
                    <p className={cx("code_zip")} ref={textRefs[0]}>
                      BFAS10
                    </p>
                    <button className={cx("btn", "dis_copy")} data-copy="BFAS10" onClick={() => copyToClipboard(0)}>
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                <div className={cx("item_discount")}>
                  <div className={cx("top_discount")}>
                    <div className={cx("item-name")}>
                      <p className={cx("code_dis")}>15% OFF</p>
                    </div>
                    <img width={36} height={20} src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/coupon2_value_img.png?1706504358658" alt="15% OFF" />
                  </div>
                  <div className={cx("coupon_desc")}>
                    Giảm <b>15%</b> cho đơn hàng từ <b>900k.</b>
                  </div>
                  <div className={cx("copy_discount")}>
                    <p className={cx("code_zip")} ref={textRefs[1]}>
                      BFAS15
                    </p>
                    <button className={cx("btn", "dis_copy")} data-copy="BFAS15" onClick={() => copyToClipboard(1)}>
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
                <div className={cx("item_discount")}>
                  <div className={cx("top_discount")}>
                    <div className={cx("item-name")}>
                      <p className={cx("code_dis")}>FREESHIP</p>
                    </div>
                    <img width={36} height={20} src="//bizweb.dktcdn.net/100/451/884/themes/857425/assets/coupon3_value_img.png?1706504358658" alt="FREESHIP" />
                  </div>
                  <div className={cx("coupon_desc")}>
                    <b>Freeship</b> cho đơn hàng <b>nội thành</b>
                  </div>
                  <div className={cx("copy_discount")}>
                    <p className={cx("code_zip")} ref={textRefs[2]}>
                      BFASFREE
                    </p>
                    <button className={cx("btn", "dis_copy")} data-copy="BFASFREE" onClick={() => copyToClipboard(2)}>
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Tags
            <Category /> */}

            {/* Có thể bạn thích */}
            <div className={cx("blog_noibat")}>
              <h2 className={cx("h2_sidebar_blog")}>
                <Link to="/blogs/all" title="Có thể bạn thích" className={cx("blog_noibat__title")}>
                  Có thể bạn thích
                </Link>
              </h2>
              <div className={cx("blog_content")}>
                {relatedProductsOfficial ? relatedProductsOfficial.slice(0, 4).map((product, index) => (
                  <div className={cx("item")} key={index}>
                    <div className={cx("post-thumb")}>
                      <Link
                        className={cx("image-blog", "scale_hover")}
                        to={`/product/detail/${product.slug}`}
                        title={product.name}
                      >
                        <img
                          className={cx("img_blog", "lazyload", "loaded")}
                          src={product?.images[0]?.imgUrl}
                          alt={product.name}
                          data-was-processed="true"
                        />
                      </Link>
                    </div>
                    <div className={cx("contentright")}>
                      <h3>
                        <Link
                          title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend"
                          to={`/product/detail/${product.slug}`}
                          className={cx("contentright__product-title")}
                        >
                          {product.name}
                        </Link>
                      </h3>

                      <div className={cx("product-price")}>
                        <h3 className={cx("new-price")}>
                          {((product.price - (product.price * product.discount) / 100) * 1000).toLocaleString('de-DE')}
                          {/* {Math.floor(
                            product.price -
                              (product.price * product.discount) / 100
                          ).toLocaleString("vi-VN")}
                          .000 */}
                          <span className={cx("currency-symbols")}>₫</span>
                        </h3>
                        <h3 className={cx("old-price")}>
                          {(product.price * 1000).toLocaleString('de-DE')}
                          <span className={cx("currency-symbols")}>₫</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                )) : <></>}
              </div>
            </div>

            {/* Sản phẩm đã xem */}
            <div className={cx("blog_noibat")}>
              <h2 className={cx("h2_sidebar_blog")}>
                <Link to="/blogs/all" title="Sản phẩm đã xem" className={cx("blog_noibat__title")}>
                  Sản phẩm đã xem
                </Link>
              </h2>
              <div className={cx("blog_content")}>
                <div className={cx("item")}>
                  <div className={cx("post-thumb")}>
                    <Link className={cx("image-blog", "scale_hover")} to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend">
                      <img
                        className={cx("img_blog", "lazyload", "loaded")}
                        src={require("../../assets/image/aocottonnucotrondangsuonginchu.webp")}
                        alt="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend"
                        data-was-processed="true"
                      />
                    </Link>
                  </div>
                  <div className={cx("contentright")}>
                    <h3>
                      <Link title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend" to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" className={cx("contentright__product-title")}>
                        Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend
                      </Link>
                    </h3>

                    <div className={cx("product-price")}>
                      <h3 className={cx("new-price")}>
                        349.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                      <h3 className={cx("old-price")}>
                        500.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className={cx("item")}>
                  <div className={cx("post-thumb")}>
                    <Link className={cx("image-blog", "scale_hover")} to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend">
                      <img
                        className={cx("img_blog", "lazyload", "loaded")}
                        src={require("../../assets/image/aocottonnucotrondangsuonginchu.webp")}
                        alt="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend"
                        data-was-processed="true"
                      />
                    </Link>
                  </div>
                  <div className={cx("contentright")}>
                    <h3>
                      <Link title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend" to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" className={cx("contentright__product-title")}>
                        Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend
                      </Link>
                    </h3>

                    <div className={cx("product-price")}>
                      <h3 className={cx("new-price")}>
                        349.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                      <h3 className={cx("old-price")}>
                        500.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className={cx("item")}>
                  <div className={cx("post-thumb")}>
                    <Link className={cx("image-blog", "scale_hover")} to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend">
                      <img
                        className={cx("img_blog", "lazyload", "loaded")}
                        src={require("../../assets/image/aocottonnucotrondangsuonginchu.webp")}
                        alt="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend"
                        data-was-processed="true"
                      />
                    </Link>
                  </div>
                  <div className={cx("contentright")}>
                    <h3>
                      <Link title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend" to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" className={cx("contentright__product-title")}>
                        Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend
                      </Link>
                    </h3>

                    <div className={cx("product-price")}>
                      <h3 className={cx("new-price")}>
                        349.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                      <h3 className={cx("old-price")}>
                        500.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className={cx("item")}>
                  <div className={cx("post-thumb")}>
                    <Link className={cx("image-blog", "scale_hover")} to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend">
                      <img
                        className={cx("img_blog", "lazyload", "loaded")}
                        src={require("../../assets/image/aocottonnucotrondangsuonginchu.webp")}
                        alt="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend"
                        data-was-processed="true"
                      />
                    </Link>
                  </div>
                  <div className={cx("contentright")}>
                    <h3>
                      <Link title="Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend" to="/ao-cotton-nu-co-tron-dang-suong-in-chu-trend" className={cx("contentright__product-title")}>
                        Áo Cotton Nữ Cổ Tròn Dáng Suông In Chữ Trend
                      </Link>
                    </h3>

                    <div className={cx("product-price")}>
                      <h3 className={cx("new-price")}>
                        349.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                      <h3 className={cx("old-price")}>
                        500.000
                        <span className={cx("currency-symbols")}>₫</span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("view-more-div")}>
                <Link to="/san-pham-da-xem" title="Xem thêm" className={cx("view-more")}>
                  Xem thêm
                  <FaChevronRight className={cx("view-more-arrow")} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
