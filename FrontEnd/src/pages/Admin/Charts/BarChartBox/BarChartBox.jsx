import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import style from './BarChartBox.module.scss';
import className from "classnames/bind";
const cx = className.bind(style)
const BarChartBox = ({props}) => {
  return (
    <div className={cx("barChartBox")}>
      <h1>{props.title}</h1>
      <div className={cx("chart")}>
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{fill:"none"}}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
