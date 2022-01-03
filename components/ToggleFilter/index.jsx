import { Select } from "antd";
import { useState } from "react";

import { Button } from "../../components";
import styles from "./toggle-filter.module.css";

import { FilterCloseIcon, FilterIcon } from "../../assets/images";
import { useAppContext } from "../../contexts/appContext";
import { filterNFTs } from "../../utils/toolKit";
const { Option } = Select;

function ToggleFilter() {
  const { displayedNFTs, AllNFTs, setDisplayedNFTs } = useAppContext();
  const [showFilters, setshowFilters] = useState(false);

  const [filters, setFilters] = useState({
    name: null,
    price: null,
  });

  let containerClasses = `${styles["container"]} `;

  function handleFilterMarket(value, type) {
    const updatedFilters = { ...filters, [type]: value ?? null };
    setFilters(updatedFilters);
    const filteredNFTS = filterNFTs(updatedFilters, [...displayedNFTs]);
    if (!filteredNFTS) return setDisplayedNFTs(displayedNFTs);
    setDisplayedNFTs([...filteredNFTS]);
  }

  if (showFilters) containerClasses += `${styles["active"]}`;

  return (
    <div className={containerClasses}>
      <div className="mt-10 mb-5">
        <Button
          onClick={() => setshowFilters(!showFilters)}
          className="width-auto"
        >
          <div className="flex items-center">
            <span className="text-base pr-4">Filter</span>
            <span>{!showFilters ? <FilterIcon /> : <FilterCloseIcon />}</span>
          </div>
        </Button>
      </div>
      <hr />
      <div
        className={`${styles["filter-container"]} grid grid-cols-2 md:grid-cols-5 gap-x-8 `}
      >
        <div className="">
          <span className={`${styles["grey-font"]} block mb-2`}>Price</span>
          <div>
            <Select
              size="large"
              allowClear
              style={{ width: "100%" }}
              onChange={(value) => handleFilterMarket(value, "price")}
            >
              <Option value="Lowest Price">Lowest Price</Option>
              <Option value="Highest Price">Highest Price</Option>
            </Select>
          </div>
        </div>
        <div className="">
          <span className={`${styles["grey-font"]} block mb-2`}>Name</span>
          <div>
            <Select
              size="large"
              allowClear
              style={{ width: "100%" }}
              onChange={(value) => handleFilterMarket(value, "name")}
            >
              <Option value="Ascending">Ascending</Option>
              <Option value="Descending">Descending</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ToggleFilter };
