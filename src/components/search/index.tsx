import React from 'react';

import searchImg from '../../assets/search.png';

import styles from './styles.module.scss';

const Search: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <input placeholder="Поиск..." type="text" />
      <button>
        <img src={searchImg} />
      </button>
    </div>
  );
};

export default Search;
