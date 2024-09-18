import React from 'react';

import searchImg from '../../assets/search.png';

import styles from './styles.module.scss';

type SearchProps = {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <div className={styles.wrapper}>
      <input placeholder="Поиск..." type="text" onChange={onChange} />
      <button>
        <img src={searchImg} alt="значек поиска" />
      </button>
    </div>
  );
};

export default Search;
