import React from 'react';

import selectImg from 'assets/select.png';

import styles from './styles.module.scss';

type SelectProps = {
  label: string;
  options: { name: string; value: string }[];
  onChange: (e: any) => any;
};

const Select: React.FC<SelectProps> = ({ label, options, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <div>
        <select onChange={({ target }) => onChange(target.value)}>
          {options?.map(({ name, value }) => (
            <option key={name + value} value={value}>
              {name}
            </option>
          ))}
        </select>
        <button className={styles.iconSelect}>
          <img src={selectImg} alt="иконка селекта" />
        </button>
      </div>
    </div>
  );
};

export default Select;
