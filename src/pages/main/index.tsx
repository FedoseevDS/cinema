import React, { useCallback, useMemo, useState } from 'react';
import { Content } from 'antd/es/layout/layout';

import Search from '../../components/search';
import Select from '../../components/select';
import Cards from '../../components/cards/cards';

import { useGetDataQuery, useGetSearchQuery } from '../../store/requests';

import styles from './styles.module.scss';

interface MapItem {
  name: string;
  poster: { previewUrl: string };
  id: number;
}

const Main: React.FC = () => {
  const [value, setValue] = useState('');
  const [showMore, setShowMore] = useState(20);

  const { data } = useGetDataQuery({ limit: !value ? showMore : 20 });
  const { data: filterData } = useGetSearchQuery(
    { limit: value ? showMore : 20, value },
    { skip: !value },
  );

  const filteredData = useMemo(() => {
    if (filterData) {
      return filterData.docs;
    }

    return data?.docs;
  }, [data, filterData]);

  const showCards = useMemo(() => {
    return filteredData?.map((i: MapItem) => {
      return (
        <React.Fragment key={i.id}>
          <Cards name={i.name} poster={i.poster} id={i.id} />
        </React.Fragment>
      );
    });
  }, [filteredData]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setValue(event.target.value);
    }, 4000);
  }, []);

  const handleButton = useCallback(() => {
    setShowMore((e) => e + 20);
  }, []);

  return (
    <Content className={styles.content}>
      <div className={styles.controlPanel}>
        <Search onChange={handleChange} />
        <div className={styles.filters}>
          <Select label="Длинное название" placeholder="Все" />
          <Select label="фильтр 2" placeholder="Текст 1" />
        </div>
        <div className={styles.filters}>
          <Select label="фильтр 3" placeholder="Поиск..." />
          <Select label="фильтр 4" placeholder="Поиск..." />
        </div>
      </div>
      <div>Найдено {filterData?.docs.length || data?.docs.length} результатов</div>
      <div className={styles.cards}>{showCards}</div>
      <button className={styles.showMore} onClick={handleButton}>
        Показать еще
      </button>
    </Content>
  );
};

export default Main;
