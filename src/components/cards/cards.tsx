import React from 'react';

import emptyImg from '../../assets/empty.png';

import styles from './styles.module.scss';

interface CardsProps {
  name: string;
  poster: { previewUrl: string };
}

const Cards: React.FC<CardsProps> = ({ name, poster }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>{name}</span>
      </div>
      <div className={styles.picture}>
        <img src={poster?.previewUrl || emptyImg}></img>
      </div>
    </div>
  );
};

export default Cards;
