import Select from 'react-select';
import React from "react";

export default function SearchSelect(props) {

let options = [];

props?.data?.map((item, index) => {
    let option={}
    option.label=item[props.labelField];
    option.value=item[props.valueField];
    options.push(option);
})
  return  <Select classNamePrefix="select" options={options} value={props.value && {label:props.value,value:props.value}}
  placeholder={`Select ${props.placeholder}`}
  onChange={opt => {console.log(opt.value); props.onChange(opt.value); }}
  />
}
