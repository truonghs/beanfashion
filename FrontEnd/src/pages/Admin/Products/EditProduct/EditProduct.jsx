// use hooks
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// use icons
import { CiCircleRemove } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

// use axios
import axiosClient from "../../../../config/axios";

// use validation form
import { checkEmptyKeys, generateErrorMessage } from "../../../../utils";

// use component
import Editor from "../../../../components/Editor/Editor";

// use toast
import { Toast } from "primereact/toast";

// use style
import style from "./EditProduct.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);
const productSample = {
  name: "",
  images: [],
  description: "",
  price: 0,
  category: {
    categoryType: "",
    sex: "",
    fabricType: "",
    categoryDetail: "",
  },
  colors: [],
  sizes: [],
  stock: [],
  discount: 0,
};
function EditProduct() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState(productSample);
  const [currentSize, setCurrentSize] = useState("");
  const [errors, setErrors] = useState({});
  const [currentColor, setCurrentColor] = useState("");
  const toast = useRef(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await axiosClient
        .get(`/admin/product/edit/${slug}`)
        .then((res) => {
          // console.log(res.data)
          setProductInfo(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, [slug]);
  const addSize = (e) => {
    e.preventDefault();
    if (currentSize.trim() !== "") {
      const isExistedSize = productInfo.sizes.includes(
        currentSize.toUpperCase()
      );
      if (!isExistedSize) {
        setProductInfo({
          ...productInfo,
          sizes: [...productInfo.sizes, currentSize.toUpperCase()],
        });
      }
      setCurrentSize("");
    }
  };
  const removeSize = (index) => {
    const sizeRemoved = productInfo.sizes[index];
    const newSizeArr = productInfo.sizes.filter((size, idx) => idx !== index);
    const newStock = productInfo.stock.filter(
      (item) => item.size !== sizeRemoved
    );
    setProductInfo({
      ...productInfo,
      sizes: newSizeArr,
      stock: newStock,
    });
  };
  const addColor = (e) => {
    e.preventDefault();
    if (currentColor.trim() !== "") {
      const isExistedColor = productInfo.colors.find(
        (color) => color.colorName === currentColor.toLowerCase()
      );

      if (!isExistedColor) {
        setProductInfo({
          ...productInfo,
          colors: [
            ...productInfo.colors,
            { colorName: currentColor.toLowerCase() },
          ],
        });
      }
      setCurrentColor("");
    }
  };
  const addColorCode = (colorCode, index) => {
    setProductInfo((prevProductInfo) => {
      const currentColorArr = [...prevProductInfo.colors];
      currentColorArr[index].colorCode = colorCode;
      return { ...prevProductInfo, colors: currentColorArr };
    });
  };

  const removeColor = (index) => {
    const colorRemoved = productInfo.colors[index];
    const newColorArr = productInfo.colors.filter(
      (color, idx) => idx !== index
    );
    const newStock = productInfo.stock.filter(
      (item) => item.color !== colorRemoved.colorName
    );
    setProductInfo({
      ...productInfo,
      colors: newColorArr,
      stock: newStock,
    });
  };
  useEffect(() => {
    if (productInfo.sizes.length > 0 && productInfo.colors.length > 0) {
      const newProductInStock = productInfo.sizes
        .map((size) =>
          productInfo.colors.map((color) => ({
            size,
            color: color.colorName,
            quantity: 0,
          }))
        )
        .flat();
      const newProductInStockMerged = [...productInfo.stock];
      newProductInStock.forEach((newItem) => {
        const existingItemIndex = newProductInStockMerged.findIndex(
          (oldItem) =>
            oldItem.color === newItem.color && oldItem.size === newItem.size
        );
        if (existingItemIndex === -1) {
          newProductInStockMerged.push(newItem);
        }
      });
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        stock: [...newProductInStockMerged],
      }));
    } else {
      setProductInfo((prevProductInfo) => ({
        ...prevProductInfo,
        stock: [],
      }));
    }
  }, [productInfo.sizes, productInfo.colors]);

  const updateStockQuantity = (index, quantity) => {
    const newProductInStock = [...productInfo.stock];
    newProductInStock[index].quantity = quantity;
    setProductInfo({ ...productInfo, stock: [...newProductInStock] });
  };
  const handleChange = (html) => {
    setProductInfo({ ...productInfo, description: html });
  };

  const onImageChoose = (e, color) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push({
          imgUrl: reader.result,
          color,
        });
        if (newImages.length === files.length) {
          setProductInfo({
            ...productInfo,
            images: [...productInfo.images, ...newImages],
          });

          e.target.value = "";
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const removeImage = (index) => {
    setProductInfo({
      ...productInfo,
      images: productInfo.images.filter((image, idx) => idx !== index),
    });
  };

  const updateProduct = (e) => {
    e.preventDefault();
    console.log(productInfo);
    const emptyKeys = checkEmptyKeys(productInfo);
    const newErrors = {};
    emptyKeys.forEach((key) => {
      newErrors[key] = generateErrorMessage(key);
    });
    if (Object.keys(newErrors).length > 1) {
      console.log("Có lỗi kkk", newErrors);
      setErrors(newErrors);
    } else {
      axiosClient
        .put(`/admin/product/update/${slug}`, productInfo)
        .then((res) => {
          toast.current.show({
            severity: "success",
            summary: "Thông Báo",
            detail: "Thêm sản phẩm thành công!",
          });
          navigate("/admin/products");
        })
        .catch((error) => {
          toast.current.show({
            severity: "error",
            summary: "Thông Báo",
            detail: "Thêm sản phẩm thất bại!",
          });
        });
    }
  };
  return (
    <>
      {!loading && (
        <div className={cx("container")}>
          <Toast ref={toast} />
          <form className={cx("formcontainer")}>
            <h2 className={cx("title")}>Biểu mẫu sửa sản phẩm</h2>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Tên sản phẩm
              </label>
              <br />
              <input
                type="text"
                className={cx("form-control")}
                name="productname"
                placeholder="Áo Polo Nam Slim Fit Ôm Vừa Người, Tôn Dáng"
                value={productInfo.name}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, name: e.target.value })
                }
              />
              {errors?.name ? (
                <span className={cx("error-text")}>{errors.name}</span>
              ) : null}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Loại sản phẩm
              </label>
              <br />
              <input
                type="text"
                className={cx("form-control")}
                name="productType"
                placeholder="Áo"
                value={productInfo.category.categoryType}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    category: {
                      ...productInfo.category,
                      categoryType: e.target.value,
                    },
                  })
                }
              />
              {errors["category.categoryType"] ? (
                <span className={cx("error-text")}>
                  {errors["category.categoryType"]}
                </span>
              ) : null}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Loại sản phẩm chi tiết
              </label>
              <br />
              <input
                type="text"
                className={cx("form-control")}
                name="productTypeDetail"
                placeholder="Áo Polo"
                value={productInfo.category.categoryDetail}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    category: {
                      ...productInfo.category,
                      categoryDetail: e.target.value,
                    },
                  })
                }
              />
              {errors["category.categoryDetail"] ? (
                <span className={cx("error-text")}>
                  {errors["category.categoryDetail"]}
                </span>
              ) : null}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Chất liệu
              </label>
              <br />
              <input
                type="text"
                className={cx("form-control")}
                name="fabric"
                placeholder="Cotton "
                value={productInfo.category.fabricType}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    category: {
                      ...productInfo.category,
                      fabricType: e.target.value,
                    },
                  })
                }
              />
              {errors["category.fabricType"] ? (
                <span className={cx("error-text")}>
                  {errors["category.fabricType"]}
                </span>
              ) : null}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Giới tính
              </label>
              <br />
              <input
                type="text"
                className={cx("form-control")}
                name="sex"
                placeholder="Nam"
                value={productInfo.category.sex}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    category: { ...productInfo.category, sex: e.target.value },
                  })
                }
              />
              {errors["category.sex"] ? (
                <span className={cx("error-text")}>
                  {errors["category.sex"]}
                </span>
              ) : null}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Kích cỡ
              </label>
              <br />
              <div className={cx("form-action")}>
                <input
                  type="text"
                  className={cx("form-control")}
                  name="size"
                  placeholder="Size S"
                  value={currentSize}
                  onChange={(e) => setCurrentSize(e.target.value)}
                />
                <button className={cx("form-btn-add")} onClick={addSize}>
                  <IoIosAddCircleOutline className={cx("icon-add")} />
                </button>
                {errors?.size ? (
                  <span className={cx("error-text")}>{errors.size}</span>
                ) : null}
              </div>
              {productInfo.sizes.length > 0 && (
                <ul className={cx("list-size")}>
                  {productInfo.sizes.map((size, index) => (
                    <li className={cx("item-size-v2")} key={index}>
                      <span>Size {size}</span>
                      <CiCircleRemove
                        className={cx("icon-remove")}
                        onClick={() => removeSize(index)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Màu sắc
              </label>
              <br />
              <div className={cx("form-action")}>
                <input
                  type="text"
                  className={cx("form-control")}
                  name="color"
                  placeholder="Nâu"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                />
                <button className={cx("form-btn-add")} onClick={addColor}>
                  <IoIosAddCircleOutline className={cx("icon-add")} />
                </button>
                {errors?.color ? (
                  <span className={cx("error-text")}>{errors.color}</span>
                ) : null}
              </div>
              {productInfo.colors.length > 0 && (
                <ul className={cx("list-size")}>
                  {productInfo?.colors.map((color, index) => (
                    <li className={cx("item-size")} key={index}>
                      <div className={cx("item-size-detail")}>
                        <span className={cx("img-color")}>
                          Màu {color.colorName}
                        </span>
                        <div
                          className={cx("show-color")}
                          style={{
                            backgroundColor: color.colorCode,
                            display: color.colorCode ? "block" : "none",
                          }}
                        ></div>
                        <CiCircleRemove
                          className={cx("icon-remove")}
                          onClick={() => removeColor(index)}
                        />
                      </div>

                      <input
                        type="text"
                        className={cx("input-color-code")}
                        placeholder="#hex color"
                        value={color.colorCode ? color.colorCode : ""}
                        onChange={(e) => {
                          addColorCode(e.target.value, index);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Giá
              </label>
              <br />
              <input
                type="text"
                className={cx("form-control")}
                name="productprice"
                placeholder="245.000₫"
                value={productInfo.price}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    price: Number(e.target.value),
                  })
                }
              />
              {errors?.price ? (
                <span className={cx("error-text")}>{errors.price}</span>
              ) : null}
            </div>
            {productInfo.stock.length > 0 && (
              <div className={cx("form-group")}>
                <label htmlFor="productname" className={cx("form-label")}>
                  Nhập dữ liệu trong kho
                </label>
                <ul className={cx("list-stock")}>
                  {productInfo.stock.map((item, index) => (
                    <li className={cx("item-stock")} key={index}>
                      <span>
                        Size {item.size} - Màu {item.color}:
                      </span>

                      <input
                        type="text"
                        value={item.quantity}
                        placeholder="Nhập số lượng"
                        onChange={(e) =>
                          updateStockQuantity(index, Number(e.target.value))
                        }
                      />
                    </li>
                  ))}
                </ul>
                {errors?.stock ? (
                  <span className={cx("error-text")}>{errors.stock}</span>
                ) : null}
                <br />
              </div>
            )}

            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Mô tả sản phẩm
              </label>
              <br />

              <Editor
                handleChange={handleChange}
                value={productInfo.description}
              />
              {errors?.description ? (
                <span className={cx("error-text")}>{errors.description}</span>
              ) : null}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Mô tả tóm tắt
              </label>
              <br />
              <textarea
                className={cx("form-control")}
                name="description"
                rows={5}
                placeholder="Chất liệu Cotton tự nhiên mềm mại, thấm hút mồ hôi và thoáng khí mang lang lại cảm giác thoải mái, dễ chịu mỗi ngày.
 Thiết kế ngắn tay, cổ tròn, kiểu dáng regular dễ dàng kết hợp với các trang phục khác."
                value={productInfo.shortDesc}
                onChange={(e) =>
                  setProductInfo({ ...productInfo, shortDesc: e.target.value })
                }
              />
              {errors?.shortDesc ? (
                <span className={cx("error-text")}>{errors.shortDesc}</span>
              ) : null}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Hình ảnh
              </label>
              <br />
              {productInfo.colors.map((color, index) => (
                <div className={cx("form-action")} key={index}>
                  <div className={cx("form-flex")}>
                    <span className={cx("img-color")}>
                      Màu {color.colorName}
                    </span>
                    <button className={cx("btn-chooseImg")}>
                      <input
                        className={cx("img-choose-input")}
                        multiple
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => onImageChoose(e, color.colorName)}
                      />
                      Chọn
                    </button>
                  </div>
                  {productInfo.images.length > 0 && (
                    <div className={cx("imgs-container")}>
                      {productInfo.images.map((image, index) => {
                        return image.color === color.colorName ? (
                          <span className={cx("img-item")} key={index}>
                            <CiCircleRemove
                              className={cx(
                                "icon-remove",
                                "icon-remove-position"
                              )}
                              onClick={() => removeImage(index)}
                            />
                            <img
                              src={image.imgUrl}
                              alt={image.color}
                              className={cx("img-choosen")}
                            />
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                  {errors?.images ? (
                    <span className={cx("error-text")}>{errors.images}</span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="productname" className={cx("form-label")}>
                Mã giảm giá
              </label>
              <br />
              <input
                type="text"
                className={cx("form-control")}
                name="discount"
                value={productInfo.discount}
                onChange={(e) =>
                  setProductInfo({
                    ...productInfo,
                    discount: Number(e.target.value),
                  })
                }
              />
            </div>
            <button className={cx("form-submit")} onClick={updateProduct}>
              Sửa sản phẩm
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditProduct;
