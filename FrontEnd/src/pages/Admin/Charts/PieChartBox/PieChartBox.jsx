import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import style from "./PieChartBox.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);

const PieChartBox = ({ data }) => {
  return (
    <>
      {data?.length > 0 && (
        <div className={cx("pieChartBox")}>
          <h1>Leads by Source</h1>
          <div className={cx("chart")}>
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "5px" }}
                />
                <Pie
                  data={data}
                  innerRadius={"70%"}
                  outerRadius={"90%"}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={cx("options")}>
            {data.map((item) => (
              <div className={cx("option")} key={item.name}>
                <div className={cx("title")}>
                  <div
                    className={cx("dot")}
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PieChartBox;
