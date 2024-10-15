import React, { useState } from 'react';

import searchImg from 'assets/search.png';

import styles from './styles.module.scss';

type SearchProps = {
  value: string;
  option: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPopupClick: (e: any) => any;
};

const Search: React.FC<SearchProps> = ({ onChange, onPopupClick, value, option }) => {
  const [closePopup, setClosePopup] = useState(true);

  const filteredOptions = option.filter((i) => i.includes(value));

  return (
    <div className={styles.wrapper}>
      <input placeholder="Поиск..." type="text" onChange={onChange} value={value} />
      <button>
        <img src={searchImg} alt="значек поиска" />
      </button>
      {value && option.length && closePopup && (
        <div className={styles.popup}>
          <ul>{filteredOptions?.map((text: string) => <li onClick={onPopupClick}>{text}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default Search;
