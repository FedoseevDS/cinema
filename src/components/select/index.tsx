import React from 'react';

import selectImg from 'assets/select.png';

import styles from './styles.module.scss';

type SelectProps = {
  label: string;
  placeholder: string;
  options: { name: string; value: string }[];
  onChange: (e: any) => any;
};

const Select: React.FC<SelectProps> = ({ label, placeholder, options, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <div>
        <select onChange={(e) => onChange(e.target.value)}>
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
