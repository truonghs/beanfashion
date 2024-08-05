import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

import style from "./AdminLayout.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);
function AdminLayout({ children }) {
  return (
    <div className={cx("main")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("menuContainer")}>
          <Sidebar />
        </div>
        <div className={cx("contentContainer")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;
