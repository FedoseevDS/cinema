import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import emptyImg from 'assets/empty.png';

import styles from './styles.module.scss';

interface CardsProps {
  name: string;
  poster: { previewUrl: string };
  id: number;
}

const Cards: React.FC<CardsProps> = ({ name, poster, id }) => {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname}/${id.toString()}`} className={styles.wrapper}>
      <div className={styles.title}>
        <span>{name || 'Нет данных'}</span>
      </div>
      <div className={styles.picture}>
        <img src={poster?.previewUrl || emptyImg} alt="постер"></img>
      </div>
    </Link>
  );
};

export default Cards;
