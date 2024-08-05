import { Link } from "react-router-dom";
import { menu } from "./data";
import style from "./Sidebar.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);
const Sidebar = () => {
  return (
    <div className={cx("menu")}>
      {menu.map((item) => (
        <div className={cx("item")} key={item.id}>
          <span className={cx("title")}>{item.title}</span>
          {item.listItems.map((listItem) => {
            const Icon = listItem.icon;
            return (
              <Link
                to={listItem.url}
                className={cx("listItem")}
                key={listItem.id}
              >
                <Icon className={cx("sidebar-icon")}/>
                <span className={cx("listItemTitle")}>{listItem.title}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
