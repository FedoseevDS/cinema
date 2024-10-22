import Search from 'components/search';
import Select from 'components/select';

import { configSelect } from './const';

import styles from './styles.module.scss';

type ControlPanelProps = {
  onSearchChange: any;
  searchParams: string;
  optionSearch: string[];
  onSelectChange: any;
  valueSelect: {
    Год: string;
    Жанр: string;
    'Рейтинг Кинопоиска': string;
    Страна: string;
  };
};

type SelectKeys = 'Год' | 'Жанр' | 'Рейтинг Кинопоиска' | 'Страна';

const ControlPanel = ({
  onSearchChange,
  searchParams,
  optionSearch,
  onSelectChange,
  valueSelect,
}: ControlPanelProps) => (
  <div className={styles.controlPanel}>
    <Search onChange={onSearchChange} value={searchParams} option={optionSearch} />
    <div className={styles.filters}>
      {configSelect.map(({ label, options }) => (
        <Select
          key={label + options}
          defaultValue={valueSelect[label as SelectKeys]}
          label={label}
          options={options}
          onChange={onSelectChange}
        />
      ))}
    </div>
  </div>
);

export default ControlPanel;
