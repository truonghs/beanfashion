import React from "react";
import style from "./Forbiden.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);
export default function Forbiden() {
  // var scene = document.getElementById('scene');
  // var parallax = new Parallax(scene);
  return (
    <div className={cx("flex")}>
      <section className={cx("wrapper")}>
        <div className={cx("container")}>
          <div id="scene" className={cx("scene")} data-hover-only="false">
            <div className={cx("circle")} data-depth="1.2"></div>

            <div className={cx("one")} data-depth="0.9">
              <div className={cx("content")}>
                <span className={cx("piece")}></span>
                <span className={cx("piece")}></span>
                <span className={cx("piece")}></span>
              </div>
            </div>
            <div className={cx("two")} data-depth="0.60">
              <div className={cx("content")}>
                <span className={cx("piece")}></span>
                <span className={cx("piece")}></span>
                <span className={cx("piece")}></span>
              </div>
            </div>
            <div className={cx("three")} data-depth="0.40">
              <div className={cx("content")}>
                <span className={cx("piece")}></span>
                <span className={cx("piece")}></span>
                <span className={cx("piece")}></span>
              </div>
            </div>
            <p className={cx("p404")} data-depth="0.50">
              404
            </p>
            <p className={cx("p404")} data-depth="0.10">
              404
            </p>
          </div>
          <div className={cx("text")}>
            <article>
              <p>Uh oh! Looks like you got lost.Go back to the homepage if you dare!</p>
              <Link className={cx("link")} to={"/"}>
                i dare!
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
