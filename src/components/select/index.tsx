import selectImg from 'assets/select.png';

import styles from './styles.module.scss';

type Option = {
  name: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: { name: string; value: string }[];
  defaultValue: string;
  valueUrl: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (data: { label: string; value: string }) => void;
};

const Select = ({ defaultValue, label, options, valueUrl, onChange }: SelectProps) => (
  <div className={styles.wrapper}>
    <label>{label}</label>
    <div>
      <select
        onChange={({ target }) => onChange({ label, value: target.value })}
        value={valueUrl || defaultValue}
      >
        {options?.map(({ name, value }: Option) => (
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

export default Select;
