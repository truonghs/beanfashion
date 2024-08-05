import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import className from "classnames/bind";
import { IoChevronUpSharp } from "react-icons/io5";
import style from "./Backtop.module.scss"
const cx = className.bind(style);

export default function Backtop() {
    const [showBackTop, setShowBackTop] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.pageYOffset > 300) { 
            setShowBackTop(true);
        } else {
            setShowBackTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        showBackTop && <button className={cx("backtop")} onClick={scrollToTop}>
            <IoChevronUpSharp className={cx("icon-up")} />
        </button>
    )
}