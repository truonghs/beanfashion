import { useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Backtop from "../../components/Backtop/Backtop";
import HeaderModal from "./Modal/HeaderModal";

import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";
const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={cx("app-container")}>
      {showModal ? (
        <HeaderModal 
        isShowModal={showModal}
        setShowModal={setShowModal}/>
      ) : (
        <>
          <Header setShowModal={setShowModal} />
          {children}
          <Backtop />
          <Footer />
        </>
      )}
    </div>
  );
}

export default DefaultLayout;
