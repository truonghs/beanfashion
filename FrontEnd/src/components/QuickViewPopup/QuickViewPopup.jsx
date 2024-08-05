import React from "react";
import QuickViewInfo from "../QuickViewInfo/QuickViewInfo";
import style from './QuickViewPopup.module.scss'
import className from "classnames/bind";

const cx = className.bind(style);

export default function QuickViewPopup({product, togglePopupQuickView, addToCartSuccess, addToCartFail}) {
    return (
        <div className={cx("popup-quickview-container")}>
            <QuickViewInfo product={product} togglePopupQuickView={togglePopupQuickView} addToCartFail={addToCartFail} addToCartSuccess={addToCartSuccess}/>
        </div>
    )
}