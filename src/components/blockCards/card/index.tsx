import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import emptyImg from 'assets/empty.png';

import styles from './styles.module.scss';

type CardsProps = {
  name: string;
  poster: { previewUrl: string };
  id: number;
};

const Card = forwardRef<HTMLAnchorElement, CardsProps>(({ name, poster, id }, ref) => (
  <Link to={`/${id.toString()}`} className={styles.wrapper} ref={ref}>
    <div className={styles.title}>
      <span>{name || 'Нет данных'}</span>
    </div>
    <div className={styles.picture}>
      <img src={poster?.previewUrl || emptyImg} alt="постер"></img>
    </div>
  </Link>
));

export default Card;
