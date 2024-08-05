import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import style from "./ChartBox.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);

const ChartBox = ({ props }) => {
  return (
    <div className={cx("chartBox")}>
      <div className={cx("boxInfo")}>
        <div className={cx("title")}>
          <span>{props.title}</span>
        </div>
        <h1>{props.number}</h1>
        {props?.href && (
          <Link to={props.href} style={{ color: props.color }}>
            View all
          </Link>
        )}
      </div>
      <div className={cx("chartInfo")}>
        <div className={cx("chart")}>
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={cx("texts")}>
          <span
            className={cx("percentage")}
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className={cx("duration")}>this week</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
