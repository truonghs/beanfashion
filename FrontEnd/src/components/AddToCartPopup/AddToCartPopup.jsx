import React, { useState, useContext, useRef } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import styles from "./AddToCartPopup.module.scss";
import className from "classnames/bind";
import axiosClient from "../../config/axios";
import { useStateContext } from "../../context/CartContextProvider";
import { AuthContext } from "../../context/AuthContext";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
const cx = className.bind(styles);

export default function AddToCartPopup({ product, togglePopup, addToCartSuccess, addToCartFail }) {

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setquantity] = useState(1);
    const { cartItems, setQuantityInCart, setCartItems } = useStateContext();
    const { isAuth } = useContext(AuthContext);

    const handleSelectColor = (color) => {
        setSelectedColor(color);
    };

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };

    const handleSelectquantity = (event) => {
        setquantity(event.target.value);
    };

    const toast = useRef(null);

    const handleAddToCart = async () => {
        if (isAuth) {
            if (product.stock.find(it => it.color === selectedColor && it.size === selectedSize).quantity === 0) {
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xin lỗi! Sản phẩm này đã bán hết', life: 3000 });
                return;
            }

            if (product.stock.find(it => it.color === selectedColor && it.size === selectedSize).quantity < quantity) {
                return toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Xin lỗi! Vượt quá số lượng trong kho!', life: 3000 });
            }

            if (!selectedSize) {
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn size', life: 3000 });
                return;
            }

            if (!selectedColor) {
                toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Vui lòng chọn màu', life: 3000 });
                return;
            }

            const data = {
                products: {
                    productId: product._id,
                    size: selectedSize,
                    color: selectedColor,
                    quantity: parseInt(quantity),
                    price: product.price,
                },
            };

            await axiosClient
                .post("/cart/add", data)
                .then((response) => {
                    console.log(response.data.message);
                    setQuantityInCart(response.data.quantity);
                    addToCartSuccess();
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
                    togglePopup();
                })
                .catch((err) => {
                    addToCartFail();
                    console.log(err);
                });
        } else {
            toast.current.show({ severity: 'error', summary: 'Lỗi', detail: 'Bạn chưa đăng nhập', life: 3000 });
        }
    };


    return (
        <>
            <Toast ref={toast} />
            <div className={cx("cart-popup-container")}>
                <div className={cx("cart-popup-header")}>
                    <span>
                        <HiOutlineShoppingBag className={cx("cart-popup-icon")} />
                        Nhập thông tin
                        <IoClose
                            className={cx("cart-popup-close-icon")}
                            onClick={togglePopup}
                        />
                    </span>
                </div>
                <div className={cx("cart-popup-content")}>
                    <div className={cx("cart-size")}>
                        <span>Chọn size:</span>
                        <div className={cx("group-size")}>
                            {product.sizes.map((size, index) => (
                                <div key={index}
                                    className={cx(
                                        "size",
                                        selectedSize === size && "active-selected"
                                    )}
                                    onClick={() => handleSelectSize(size)}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx("cart-color")}>
                        <span>Chọn màu:</span>
                        <div className={cx("group-color")}>
                            {product.colors.map((color, index) => (
                                <div key={index}
                                    className={cx(
                                        "color",
                                        selectedColor === color.colorName && "active-selected"
                                    )}
                                    onClick={() => handleSelectColor(color.colorName)}
                                >
                                    {color.colorName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx("cart-quantity")}>
                        <span>Nhập số lượng:</span>
                        <input
                            type="number"
                            value={quantity}
                            className={cx("quantity")}
                            min={1}
                            max={99}
                            onChange={handleSelectquantity}
                        />
                    </div>
                </div>
                <div className={cx("cart-popup-button-group")}>
                    <button
                        type="button"
                        className={cx("btn-continue")}
                        onClick={togglePopup}
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        className={cx("btn-checkout")}
                        onClick={handleAddToCart}
                    >
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </>
    )
}