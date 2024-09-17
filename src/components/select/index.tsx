import React from 'react';

import selectImg from '../../assets/select.png';

import styles from './styles.module.scss';

interface SelectProps {
  label: string;
  placeholder: string;
}

const Select: React.FC<SelectProps> = ({ label, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <div>
        <select>
          <option disabled selected hidden>
            {placeholder}
          </option>
        </select>
        <img src={selectImg} />
      </div>
    </div>
  );
};

export default Select;
