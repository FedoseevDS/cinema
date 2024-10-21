import selectImg from 'assets/select.png';

import styles from './styles.module.scss';

type SelectProps = {
  label: string;
  options: { name: string; value: string }[];
  defaultValue: boolean;
  valueUrl: string;
  onChange: (e: any) => any;
};

const Select = ({ defaultValue, label, options, valueUrl, onChange }: SelectProps) => {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <div>
        <select
          onChange={({ target }) => onChange({ label, value: target.value })}
          value={valueUrl}
        >
          {options?.map(({ name, value }, index) => (
            <option key={name + value} value={value} selected={!defaultValue && index === 0}>
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
