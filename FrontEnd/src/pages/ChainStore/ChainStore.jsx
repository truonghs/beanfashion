import style from "./ChainStore.module.scss";
import className from "classnames/bind";
import { IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "../../config/axios";

const cx = className.bind(style);
const url = "https://vapi.vnappmob.com/api";

function ChainStore() {
  const [listProvinces, setListProvinces] = useState();
  const [listDistricts, setListDistricts] = useState();
  const [listTowns, setListTowns] = useState();

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTown, setSelectedTown] = useState("");

  const [locationStore, setLocationStore] = useState();

  const [selectedLocation, setSelectedLocation] = useState({
    province: "",
    district: "",
    town: "",
  });

  const getLocationStore = async () => {
    try {
      const response = await axiosClient.get("/location/getLocation");
      if (response.status === 200) {
        setLocationStore(response.data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      console.error("Error fetching location:", error);
    }
  };

  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    let provinceName = listProvinces.find((province) => province.province_id === provinceId)?.province_name || "";
    setSelectedLocation((prevState) => ({
      ...prevState,
      province: provinceName,
      district: "",
      town: "",
    }));
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedTown("");
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    let districtName = listDistricts.find((district) => district.district_id === districtId)?.district_name || "";
    setSelectedLocation((prevState) => ({
      ...prevState,
      district: districtName,
      town: "",
    }));
    setSelectedDistrict(districtId);
    setSelectedTown("");
  };

  const handleTownChange = (event) => {
    const townId = event.target.value;
    let townName = listTowns.find((ward) => ward.ward_id === townId)?.ward_name || "";
    setSelectedLocation((prevState) => ({
      ...prevState,
      town: townName,
    }));
    setSelectedTown(townId);
  };

  const getListProvinces = async () => {
    const provincesData = await axios.get(url + "/province/");
    setListProvinces(provincesData.data.results);
  };

  const getListDistricts = async (provinceId) => {
    const districtsData = await axios.get(url + "/province/district/" + provinceId);
    setListDistricts(districtsData.data.results);
  };

  const getListTowns = async (districtId) => {
    const townsData = await axios.get(url + "/province/ward/" + districtId);
    setListTowns(townsData.data.results);
  };

  useEffect(() => {
    getListProvinces();
    getLocationStore();
  }, []);

  useEffect(() => {
    if (selectedProvince !== "") getListDistricts(selectedProvince);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict !== "") getListTowns(selectedDistrict);
  }, [selectedDistrict]);

  return (
    <div className={cx("container")}>
      <div className={cx("main")}>
        <div className={cx("side-bar")}>
          <div className={cx("province")}>
            <div className={cx("province-sort")}>
              <select value={selectedProvince} onChange={handleProvinceChange}>
                <option value={""}>Chọn tỉnh thành</option>
                {listProvinces ? (
                  listProvinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>
                      {province.province_name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <div className={cx("district")}>
            <div className={cx("district-sort")}>
              <select value={selectedDistrict} onChange={handleDistrictChange}>
                <option value={""}>Chọn quận/huyện</option>
                {listDistricts ? (
                  listDistricts.map((district) => (
                    <option key={district.district_id} value={district.district_id}>
                      {district.district_name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <div className={cx("town")}>
            <div className={cx("town-sort")}>
              <select value={selectedTown} onChange={handleTownChange}>
                <option value={""}>Chọn phường xã</option>
                {listTowns ? (
                  listTowns.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                      {ward.ward_name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
          </div>
          <div className={cx("store-location-container")}>
            <div className={cx("store-location-box")}>
              {locationStore ? (
                locationStore.length ? (
                  locationStore
                    .filter((item) =>
                      selectedLocation.province !== ""
                        ? selectedLocation.district !== ""
                          ? selectedLocation.town !== ""
                            ? item.city === selectedLocation.province && item.district === selectedLocation.district && item.ward === selectedLocation.town
                            : item.city === selectedLocation.province && item.district === selectedLocation.district
                          : item.city === selectedLocation.province
                        : item
                    )
                    .map((location, index) => (
                      <div key={index} className={cx("store-location-name")}>
                        <h6>{"Bean Fashion " + location.city}</h6>
                        <span>
                          <FaLocationDot className={cx("icon")} />
                          {location.addressDetail + ", " + location.ward + ", " + location.district + ", " + location.city}
                        </span>
                        <span>
                          <FaPhoneVolume className={cx("icon")} />
                          {location.phoneNumber}
                        </span>
                      </div>
                    ))
                ) : (
                  <div className={cx("store-location-name")}></div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className={cx("content")}>
          <div className={cx("map")}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2309821348504!2d106.79999857451831!3d10.870028557461255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527e7e8abb0eb%3A0xec43e4b99472c18a!2zVUlUIC0gQ-G7lW5nIEE!5e0!3m2!1svi!2s!4v1711957805181!5m2!1svi!2s"
              width={900}
              height={600}
              allowfullscreen={""}
              loading={"lazy"}
              referrerpolicy={"no-referrer-when-downgrade"}
              title="Store Location"
              
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChainStore;
