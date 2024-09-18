import React from 'react';
import { Content } from 'antd/es/layout/layout';

import Search from '../../components/search';
import Select from '../../components/select';
import Cards from '../../components/cards/cards';

import { useGetDataQuery } from '../../store/requests';

import styles from './styles.module.scss';

interface MapItem {
  name: string;
  poster: { previewUrl: string };
  id: number;
}

const Main: React.FC = () => {
  const { data } = useGetDataQuery('');

  const showCards = () => {
    return data?.docs.map((i: MapItem) => {
      return (
        <React.Fragment key={i.id}>
          <Cards name={i.name} poster={i.poster} id={i.id} />
        </React.Fragment>
      );
    });
  };

  return (
    <Content className={styles.content}>
      <div className={styles.controlPanel}>
        <Search />
        <div className={styles.filters}>
          <Select label="Длинное название" placeholder="Все" />
          <Select label="фильтр 2" placeholder="Текст 1" />
        </div>
        <div className={styles.filters}>
          <Select label="фильтр 3" placeholder="Поиск..." />
          <Select label="фильтр 4" placeholder="Поиск..." />
        </div>
      </div>
      <div>Найдено {data?.docs.length} результатов</div>
      <div className={styles.cards}>{showCards()}</div>
      <button className={styles.showMore}>Показать еще</button>
    </Content>
  );
};

export default Main;
