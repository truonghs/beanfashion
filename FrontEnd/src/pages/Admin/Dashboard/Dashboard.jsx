import { useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  BarChartBox,
  BigChartBox,
  ChartBox,
  PieChartBox,
  TopBox,
} from "../Charts";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "./data";
import axiosClient from "../../../config/axios";
import style from "./Dashboard.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);

const Dashboard = () => {
  const [statisticalData, setStatisticalData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/admin/dashboard")
      .then(({ data }) => {
        setStatisticalData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={cx("dashboard_container")}>
      {loading && (
        <>
          <h1 style={{ color: "#fff" }}>Đang tải dữ liệu thống kê...</h1>
          <div className={cx("loading")}>
            <ProgressSpinner style={{ margin: "auto" }} />
          </div>
        </>
      )}
      {!loading && (
        <div className={cx("dashboard")}>
          <div className={cx("box", "box1")}>
            <TopBox topDealUsers={statisticalData.topDealUsers} />
          </div>
          <div className={cx("box", "box2")}>
            <ChartBox
              props={{
                title: "Total Users",
                color: "#8884d8",
                dataKey: "users",
                href: "/admin/accounts",
                ...statisticalData.statisticalGrowthAccounts,
              }}
            />
          </div>
          <div className={cx("box", "box3")}>
            <ChartBox
              props={{
                title: "Total Products",
                color: "skyblue",
                dataKey: "products",
                href: "/admin/products",
                ...statisticalData.statisticalGrowthProducts,
              }}
            />
          </div>
          <div className={cx("box", "box4")}>
            <PieChartBox
              data={statisticalData.statisticsProductPurchase?.data}
            />
          </div>
          <div className={cx("box", "box5")}>
            <ChartBox props={chartBoxConversion} />
          </div>
          <div className={cx("box", "box6")}>
            <ChartBox
              props={{
                title: "Total Revenue",
                color: "teal",
                dataKey: "revenue",
                ...statisticalData.statisticalGrowthRevenue,
              }}
            />
          </div>
          <div className={cx("box", "box7")}>
            <BigChartBox
              data={statisticalData.statisticsProductPurchase?.chartData}
            />
          </div>
          <div className={cx("box", "box8")}>
            <BarChartBox props={barChartBoxVisit} />
          </div>
          <div className={cx("box", "box9")}>
            <BarChartBox
              props={{
                title: "Profit Earned",
                color: "#8884d8",
                dataKey: "profit",
                chartData: statisticalData.statisticalGrowthProfit?.chartData,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
