import React from 'react';
import { useParams } from 'react-router-dom';

import emptyImg from 'assets/empty.png';

import { useGetItemQuery } from 'store/requests';

import styles from './styles.module.scss';

const Detail: React.FC = () => {
  const { id } = useParams();

  const { data = [], isLoading } = useGetItemQuery({ id });

  if (!data) {
    return isLoading && <div>Идет загрузка...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.poster}>
          <img src={data?.poster?.previewUrl || emptyImg} alt="постер" />
        </div>
        <div className={styles.content}>
          <span>{data?.name}</span>
          <span>{data?.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Detail;
