import React from 'react';

import searchImg from 'assets/search.png';

import styles from './styles.module.scss';

type SearchProps = {
  value: string;
  option: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPopupClick: (e: any) => any;
};

const Search = ({ onChange, onPopupClick, option, value }: SearchProps) => {
  return (
    <div className={styles.wrapper}>
      <input placeholder="Поиск..." type="text" onChange={onChange} value={value} />
      <button>
        <img src={searchImg} alt="значек поиска" />
      </button>
      {value && (
        <div className={styles.popup}>
          {option.map((text: string) => (
            <ul>
              <li onClick={onPopupClick}>{text}</li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
