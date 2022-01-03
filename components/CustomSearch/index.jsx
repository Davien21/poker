import React from "react";
import { Select } from "antd";
import styles from "./custom-search.module.css";
const { Option } = Select;

function CustomSearch({ list, onSearch }) {
  return (
    <Select
      allowClear
      showSearch
      placeholder="Search for an item or NFT"
      optionFilterProp="children"
      onChange={onSearch}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      className={styles["container"]}
    >
      {list &&
        list.map((item, index) => (
          <Option key={item + index + Math.random() * 3} value={item}>
            {item}
          </Option>
        ))}
    </Select>
  );
}

export { CustomSearch };
