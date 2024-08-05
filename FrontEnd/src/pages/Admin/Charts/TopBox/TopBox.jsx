import style from "./TopBox.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);

const TopBox = ({ topDealUsers }) => {
  return (
    <>
      {topDealUsers?.length > 0 && (
        <div className={cx("topBox")}>
          <h1 className={cx("title")}>Top Deals</h1>
          <div className={cx("list")}>
            {topDealUsers?.map((user, index) => (
              <div className={cx("listItem")} key={index}>
                <div className={cx("user")}>
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDRdeIgFbVAPB2l2jTnwUgpL-ddgm3bd-kBoCOPf8CVA&s"
                    }
                    alt={user.name}
                  />
                  <div className={cx("userTexts")}>
                    <span className={cx("username")}>{user.name}</span>
                    <span className={cx("email")}>{user.email}</span>
                  </div>
                </div>
                <span className={cx("amount")}>
                  {
                    (user.totalAmount*1000).toLocaleString('de-DE')
                  }đ
                  {/* {Math.round(user.totalAmount).toLocaleString("vi-VN")}.000đ */}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TopBox;
