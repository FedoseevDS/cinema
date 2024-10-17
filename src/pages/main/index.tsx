import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Layout } from 'antd';
import List from 'rc-virtual-list';

import Search from 'components/search';
import Select from 'components/select';
import Cards from 'components/cards';

import useDebounce from 'hooks/useDebouncedCallback';

import { useGetDataQuery, useGetFiltersQuery, useGetSearchQuery } from 'store/requests';

import { countriesConfig, genresConfig, ratingsConfig, yearsConfig } from './const';

import { initialState, reducer } from 'reducer';

import styles from './styles.module.scss';
import { helpData } from '../../consts/data';

type MapItem = {
  name: string;
  poster: { previewUrl: string };
  id: number;
};

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showMore, setShowMore] = useState(25);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState('');
  const [countries, setCountries] = useState('');
  const [years, setYears] = useState('');
  const [ratings, setRatings] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearchTerm = useDebounce(searchParams.get('search') || '', 750);

  useEffect(() => {
    dispatch({ payload: debouncedSearchTerm, type: 'search' });
  }, [debouncedSearchTerm]);

  const isFilter = useMemo(
    () => !!genres || !!countries || !!years || !!ratings,
    [genres, countries, years, ratings],
  );

  // const { data } = useGetDataQuery({ limit: !debouncedSearchTerm && showMore, page });

  // const { data: searchData } = useGetSearchQuery(
  //   { page: debouncedSearchTerm ? showMore : 1, value: debouncedSearchTerm },
  //   { skip: !debouncedSearchTerm },
  // );

  // const { data: filterData } = useGetFiltersQuery(
  //   {
  //     country: countries === 'null' ? JSON.parse(countries) : countries,
  //     genres: genres === 'null' ? JSON.parse(genres) : genres,
  //     ratings: ratings === 'null' ? JSON.parse(ratings) : ratings,
  //     year: years === 'null' ? JSON.parse(years) : years,
  //   },
  //   { skip: !isFilter },
  // );

  const filteredData = useMemo(() => {
    // if (searchData) {
    //   return searchData.docs;
    // }
    // if (filterData) {
    //   return filterData.docs;
    // }

    return helpData.docs;

    // return data?.docs;
    // }, [data, searchData, filterData]);
  }, []);

  const handleButton = useCallback(() => {
    if (showMore < 250) {
      setShowMore((e) => e + 25);
    }

    if (showMore === 250) {
      setPage((e) => e + 1);
    }
  }, [showMore]);

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

  const handlePopupClick = useCallback((e) => {
    const text = e.target.textContent;
    setSearchParams({ search: text }, { replace: true });
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
        <Search
          onChange={handleSearchChange}
          value={searchParams.get('search') || ''}
          option={Array.from(state.search)}
          onPopupClick={handlePopupClick}
        />
        <div className={styles.filters}>
          <Select label="Жанр" options={genresConfig} onChange={setGenres} />
          <Select label="Страна" options={countriesConfig} onChange={setCountries} />
          <Select label="Год" options={yearsConfig} onChange={setYears} />
          <Select label="Рейтинг Кинопоиска" options={ratingsConfig} onChange={setRatings} />
        </div>
      </div>
      <div>
        <span>Найдено {filteredData?.length} результатов,</span>
        <span> Страница {page}</span>
      </div>
      {filteredData?.length ? (
        <div className={styles.virtualList}>
          <List data={filteredData} itemKey={(item) => item.id} height={830} itemHeight={120}>
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
