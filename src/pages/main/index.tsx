import { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout } from 'antd';
import List from 'rc-virtual-list';

import Search from 'components/search';
import Select from 'components/select';
import Cards from 'components/cards';

import useDebounce from 'hooks/useDebouncedCallback';

import { useGetDataQuery, useGetFiltersQuery, useGetSearchQuery } from 'store/requests';

import { countriesConfig, genresConfig, ratingsConfig, yearsConfig } from './const';

import styles from './styles.module.scss';
import { useLocation, useSearchParams } from 'react-router-dom';

type MapItem = {
  name: string;
  poster: { previewUrl: string };
  id: number;
};

const Main = () => {
  const [showMore, setShowMore] = useState(1);
  const [genres, setGenres] = useState('');
  const [countries, setCountries] = useState('');
  const [years, setYears] = useState('');
  const [ratings, setRatings] = useState('');
  const [height, setHeight] = useState(window.innerHeight);
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearchTerm = useDebounce(searchParams.get('search') || '', 750);

  const isFilter = useMemo(
    () => !!genres || !!countries || !!years || !!ratings,
    [genres, countries, years, ratings],
  );

  const { data } = useGetDataQuery({ page: !debouncedSearchTerm ? showMore : 1 });
  const { data: searchData } = useGetSearchQuery(
    { page: debouncedSearchTerm ? showMore : 1, value: debouncedSearchTerm },
    { skip: !debouncedSearchTerm },
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

  const prepareHeight = useMemo(() => (height < 1000 ? 500 : height - 500), [height]);

  const filteredData = useMemo(() => {
    if (searchData) {
      return searchData.docs;
    }
    if (filterData) {
      return filterData.docs;
    }

    return data?.docs;
  }, [data, searchData, filterData]);

  const handleButton = useCallback(() => {
    setShowMore((e) => e + 1);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value) {
        setSearchParams({ search: value }, { replace: true });
      } else {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete('search');
          return newParams;
        });
      }
    },
    [setSearchParams],
  );

  useEffect(() => {
    const updateHeight = () => setHeight(window.innerHeight);
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('search');
        return newParams;
      });
    }
  }, []);

  return (
    <Layout.Content className={styles.content}>
      <div className={styles.controlPanel}>
        <Search onChange={handleSearchChange} value={searchParams.get('search') || ''} />
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
        <div className={styles.virtualList}>
          <List
            data={filteredData}
            itemKey={(item) => item.id}
            height={prepareHeight}
            itemHeight={120}
          >
            {(item: MapItem) => (
              <Cards key={item.id} name={item.name} poster={item.poster} id={item.id} />
            )}
          </List>
        </div>
      ) : (
        <div>Нет данных</div>
      )}
      <button className={styles.showMore} onClick={handleButton}>
        Показать еще
      </button>
    </Layout.Content>
  );
};

export default Main;
