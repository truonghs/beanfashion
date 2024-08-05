import style from "./NoneLayout.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);
function NoneLayout({ children }) {
  return <div className={cx("main")}>{children}</div>;
}

export default NoneLayout;
