import React, { useCallback, useMemo, useState } from 'react';
import { Content } from 'antd/es/layout/layout';

import Search from 'components/search';
import Select from 'components/select';
import Cards from 'components/cards';

import { useGetDataQuery, useGetFiltersQuery, useGetSearchQuery } from 'store/requests';

import { countriesConfig, genresConfig, ratingsConfig, yearsConfig } from './const';
import styles from './styles.module.scss';

type MapItem = {
  name: string;
  poster: { previewUrl: string };
  id: number;
};

const Main: React.FC = () => {
  const [value, setValue] = useState('');
  const [showMore, setShowMore] = useState(20);
  const [genres, setGenres] = useState('');
  const [countries, setCountries] = useState('');
  const [years, setYears] = useState('');
  const [ratings, setRatings] = useState('');

  const isFilter = useMemo(
    () => !!genres || !!countries || !!years || !!ratings,
    [genres, countries, years, ratings],
  );

  const { data } = useGetDataQuery({ page: !value ? showMore : 1 });
  const { data: searchData } = useGetSearchQuery(
    { page: value ? showMore : 1, value },
    { skip: !value },
  );
  const { data: filterData } = useGetFiltersQuery(
    {
      country: countries,
      genres: genres,
      ratings: ratings,
      year: years,
    },
    { skip: !isFilter },
  );

  const filteredData = useMemo(() => {
    if (searchData) {
      return searchData.docs;
    }
    if (filterData) {
      return filterData.docs;
    }

    return data?.docs;
  }, [data, searchData, filterData]);

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
    setShowMore((e) => e + 1);
  }, []);

  return (
    <Content className={styles.content}>
      <div className={styles.controlPanel}>
        <Search onChange={handleChange} />
        <div className={styles.filters}>
          <Select
            label="Жанр"
            placeholder="Выберите жанр"
            options={genresConfig}
            onChange={setGenres}
          />
          <Select
            label="Страна"
            placeholder="Выберите страну"
            options={countriesConfig}
            onChange={setCountries}
          />
        </div>
        <div className={styles.filters}>
          <Select
            label="Год"
            placeholder="Выберите год"
            options={yearsConfig}
            onChange={setYears}
          />
          <Select
            label="Рейтинг Кинопоиска"
            placeholder="Выберите рейтинг"
            options={ratingsConfig}
            onChange={setRatings}
          />
        </div>
      </div>
      <div>Найдено {filteredData?.length} результатов</div>
      {filteredData?.length ? (
        <div className={styles.cards}>{showCards}</div>
      ) : (
        <div>Нет данных</div>
      )}
      <button className={styles.showMore} onClick={handleButton}>
        Показать еще
      </button>
    </Content>
  );
};

export default Main;
