import style from "./Footer.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);
const Footer = () => {
  return (
    <div className={cx("footer")}>
      <span>lamadmin</span>
      <span>© Lama Dev Admin Dashboard</span>
    </div>
  );
};

export default Footer;
