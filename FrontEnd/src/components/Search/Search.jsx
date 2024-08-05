import { useState, useEffect, useRef, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { BsFire } from "react-icons/bs";
import { FaCircleXmark, FaSpinner } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import classNames from "classnames/bind";
import style from "./Search.module.scss";

import axiosClient from "../../config/axios";
import { useDebounce, useWindowDimensions } from "../../hooks";

const cx = classNames.bind(style);

export default function Search() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [showResult, setShowResult] = useState(false);

  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const { width } = useWindowDimensions();

  const inputRef = useRef();
  const onSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      return;
    }
    setShowResult(false);
    handleClear();
    return navigate(`/products?searchValue=${searchValue}`);
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);

    inputRef.current.focus();
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };
  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      setLoading(true);

      await axiosClient
        .get(`/product/search/${debounced}`)
        .then(({ data }) => {
          setSearchResult(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchApi();
  }, [debounced]);
  const viewProductDetail = (slug) => {
    handleHideResult();
    handleClear();
    return navigate(`/product/detail/${slug}`);
  };
  return (
    <HeadlessTippy
      appendTo={() => document.body}
      interactive
      visible={showResult}
      offset={[-17, 10]}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <div className={cx("search-wrapper")}>
            <div className={cx("search-suggest")}>
              <div className={cx("item-suggest")}>
                <div className={cx("search-title")}>
                  <BsFire /> TÌM KIẾM NHIỀU NHẤT
                </div>
              </div>
              <div className={cx("search-list")}>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm áo sơ mi"
                >
                  Áo sơ mi
                </Link>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm áo khoác"
                >
                  Áo khoác
                </Link>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm quần tây"
                >
                  Quần tây
                </Link>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm váy"
                >
                  Váy
                </Link>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm Jumpsuit"
                >
                  Jumpsuit
                </Link>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm túi đeo chéo"
                >
                  Túi đeo chéo
                </Link>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm thắt lưng"
                >
                  Thắt lưng
                </Link>
                <Link
                  href=""
                  className={cx("search-item")}
                  title="Tìm kiếm khăn choàng"
                >
                  Khăn choàng
                </Link>
              </div>
            </div>
            {searchResult.length > 0 &&
              searchResult.slice(0, 4).map((product, index) => (
                <div className={cx("product-smart")}>
                  <Link
                    className={cx("product-smart__image")}
                    to={`/product/detail/${product.slug}`}
                    title={product.name}
                    onClick={handleClear}
                  >
                    <img
                      className={cx("image-thumb")}
                      src={product.images[0].imgUrl}
                      alt={product.slug}
                    />
                  </Link>
                  <div className={cx("product-smart__info")}>
                    <div className={cx("product-smart__info_name")}>
                      <Link
                        to={`/product/detail/${product.slug}`}
                        onClick={handleClear}
                      >
                        {product.name}
                      </Link>
                    </div>
                    <div className={cx("product-smart__info_price")}>
                      <span className={cx("price-box")}>
                        {(product.price * 1000).toLocaleString('de-DE')}đ
                        {/* {product.price}.000đ */}
                      </span>
                      <span className={cx("compare-price")}>
                        {
                          ((product.price - (product.price * product.discount) / 100) * 1000).toLocaleString('de-DE')
                        }đ
                        {/* {product.price - product.discount * product.price}
                        .000đ */}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            <div className={cx("product-search-see-all")}>
              <Link
                to={`/products?searchValue=${searchValue}`}
                className={cx("see-all-search")}
                title="Xem tất cả"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
        </div>
      )}
      // maxWidth={"100%"}
      onClickOutside={handleHideResult}
    >
      <div className={cx("search__input-container")}>
        <input
          className={cx("search__input")}
          type="text"
          placeholder="Tìm sản phẩm..."
          ref={inputRef}
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setShowResult(true)}
        />
        {/* {!!searchValue && !loading && (
          <button
            className={cx("clear")}
            onClick={handleClear}
            style={{ left: width * 0.66 }}
          >
            <FaCircleXmark />
          </button>
        )}

        {loading && (
          <FaSpinner className={cx("loading")} style={{ left: width * 0.66 }} />
        )} */}

        <button className={cx("search__btn")} onClick={(e) => onSearch(e)}>
          <GoSearch className={cx("icon-style")} />
        </button>
      </div>
    </HeadlessTippy>
  );
}
