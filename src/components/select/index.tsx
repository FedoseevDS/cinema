import React from 'react';

import selectImg from '../../assets/select.png';

import styles from './styles.module.scss';

interface SelectProps {
  label: string;
  placeholder: string;
  options: { name: string; value: string }[];

  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// const Select: React.FC<SelectProps> = ({ label, placeholder, options, onCahnge }) => {
const Select: React.FC<SelectProps> = ({ label, placeholder, options }) => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <div>
        {/* <select onChange={onChange}> */}
        <select>
          <option disabled selected hidden value="">
            {placeholder}
          </option>
          {options?.map(({ name, value }) => (
            <option key={name + value} value={value}>
              {name}
            </option>
          ))}
        </select>
        <img src={selectImg} alt="иконка селекта" />
      </div>
    </div>
  );
};

export default Select;
