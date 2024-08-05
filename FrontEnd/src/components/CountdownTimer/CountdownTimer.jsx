import React, { useState, useEffect } from "react";
import styles from "./CountdownTimer.module.scss";
import className from "classnames/bind";
const cx = className.bind(styles);

export default function CountdownTimer() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    let targetTime;
    if (currentTime.getHours() >= 0 && currentTime.getHours() < 6) {
        targetTime = new Date(currentTime);
        targetTime.setHours(6, 0, 0, 0);
    }
    else if (currentTime.getHours() >= 6 && currentTime.getHours() < 12) {
        targetTime = new Date(currentTime);
        targetTime.setHours(12, 0, 0, 0);
    }
    else if (currentTime.getHours() >=12 && currentTime.getHours() < 20) {
        targetTime = new Date(currentTime);
        targetTime.setHours(20, 0, 0, 0);
    }
    else {
        targetTime = new Date(currentTime);
        targetTime.setHours(24, 0, 0, 0);
    }
    const timeRemain = Math.floor((targetTime - currentTime) / 1000);
    const hours = Math.floor(timeRemain / 3600);
    const minutes = Math.floor((timeRemain % 3600) / 60);
    const seconds = timeRemain % 60;

    return (
        <div className={cx("count-down")}>
            <div className={cx("title-km")}>
                Thời gian khuyến mãi
            </div>
            <div className={cx("timer-view")}>
                <div className={cx("block-timer")}>
                    <p>
                        <b className={cx("hours")} id="hours">{hours} </b>
                    </p>
                </div>
                <div className={cx("block-timer")}>
                    <p>
                        <b className={cx("minutes")} id="minutes">{minutes}</b>
                    </p>
                </div>
                <div className={cx("block-timer")}>
                    <p>
                        <b className={cx("seconds")} id="second">{seconds}</b>
                    </p>
                </div>
            </div>
        </div>
    )
}