import React from 'react';

import searchImg from 'assets/search.png';

import styles from './styles.module.scss';

type SearchProps = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ onChange, value }) => {
  return (
    <div className={styles.wrapper}>
      <input placeholder="Поиск..." type="text" onChange={onChange} value={value} />
      <button>
        <img src={searchImg} alt="значек поиска" />
      </button>
    </div>
  );
};

export default Search;
