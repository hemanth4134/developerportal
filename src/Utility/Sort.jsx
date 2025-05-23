import { useState } from "react";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

export default function Sort(props) {
  const [sortType, setSortType] = useState(true);

  if (sortType) {
    return <CaretDownFill className="header-sort" onClick={sortUserData} />;
  } else {
    return <CaretUpFill className="header-sort" onClick={sortUserData} />;
  }

  function sortUserData() {
    const data = [...props.filteredResult];
    if (sortType) {
      props.setFilteredResult(data.sort(getSortOrder(props.field)));
    } else {
      props.setFilteredResult(data.sort(getReverseSortOrder(props.field)));
    }
    setSortType(!sortType);
  }
}

export function getSortOrder(prop) {
  return function (a, b) {
    let left = a[prop] ? typeof a[prop] === "string" ? a[prop].toLowerCase() : a[prop] : "";
    let right = b[prop] ? typeof b[prop] === "string" ? b[prop].toLowerCase() : b[prop] : "";

    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    }
    return 0;
  };
}
export function getReverseSortOrder(prop) {
  return function (a, b) {
    let left = a[prop] ? typeof a[prop] === "string" ? a[prop].toLowerCase() : a[prop] : "";
    let right = b[prop] ? typeof b[prop] === "string" ? b[prop].toLowerCase() : b[prop] : "";

    if (left < right) {
      return 1;
    } else if (left > right) {
      return -1;
    }
    return 0;
  };
}
