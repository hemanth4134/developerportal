import Select from 'react-select';
import React from "react";

export default function SearchSelectMulti(props) {

let options = [];

props?.data?.map((item, index) => {
    let option={}
    option.label=item[props.labelField];
    option.value=item[props.valueField];
    options.push(option);
})

  return  <Select classNamePrefix="mutil-select" closeMenuOnSelect={false} isMulti allowSelectAll={true} options={options} placeholder={`Select ${props.placeholder}`}
  onChange={opt => {console.log(opt); props.onChange(opt);}}
  />
}
