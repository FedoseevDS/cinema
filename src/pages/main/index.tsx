import { useCallback, useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from 'antd';
import List from 'rc-virtual-list';

import Search from 'components/search';
import Select from 'components/select';
import Cards from 'components/cards';

import useDebounce from 'hooks/useDebouncedCallback';

import { useGetDataQuery } from 'store/requests';

import { countriesConfig, genresConfig, ratingsConfig, yearsConfig } from './const';

import { initialState, reducer } from 'reducer';

import styles from './styles.module.scss';
// import { helpData } from '../../consts/data';

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

  const { data } = useGetDataQuery({
    params: {
      limit: !debouncedSearchTerm && showMore,
      page,
      ...(countries
        ? { 'countries.name': countries === 'null' ? JSON.parse(countries) : countries }
        : null),
      ...(genres ? { 'genres.name': genres === 'null' ? JSON.parse(genres) : genres } : null),
      ...(ratings ? { 'rating.kp': ratings === 'null' ? JSON.parse(ratings) : ratings } : null),
      ...(years ? { year: years === 'null' ? JSON.parse(years) : years } : null),
    },
    search: { query: debouncedSearchTerm || null },
  });

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
        setGenres('');
        setCountries('');
        setYears('');
        setRatings('');

        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('search', value);
          const keysToDelete = ['Жанр', 'Страна', 'Год', 'Рейтинг'];
          keysToDelete.forEach((key) => newParams.delete(key));
          return newParams;
        });
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

  const handlePopupClick = useCallback((e: any) => {
    const text = e.target.textContent;

    setGenres('');
    setCountries('');
    setYears('');
    setRatings('');

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('search', text);
      const keysToDelete = ['Жанр', 'Страна', 'Год', 'Рейтинг'];
      keysToDelete.forEach((key) => newParams.delete(key));
      return newParams;
    });
  }, []);

  const handleSelectChange = useCallback(
    ({ label, value }: { label: string; value: string }) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set(label, value);
        newParams.delete('search');
        return newParams;
      });

      switch (label) {
        case 'Жанр':
          return setGenres(value);
        case 'Год':
          return setYears(value);
        case 'Страна':
          return setCountries(value);
        default:
          return setRatings(value);
      }
    },
    [setSearchParams],
  );

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
          <Select
            label="Жанр"
            options={genresConfig}
            onChange={handleSelectChange}
            defaultValue={!!genres}
          />
          <Select
            label="Страна"
            options={countriesConfig}
            onChange={handleSelectChange}
            defaultValue={!!countries}
          />
          <Select
            label="Год"
            options={yearsConfig}
            onChange={handleSelectChange}
            defaultValue={!!years}
          />
          <Select
            label="Рейтинг Кинопоиска"
            options={ratingsConfig}
            onChange={handleSelectChange}
            defaultValue={!!ratings}
          />
        </div>
      </div>
      <div>
        <span>Найдено {data?.docs?.length} результатов,</span>
        <span> Страница {page}</span>
      </div>
      {data?.docs?.length ? (
        <div className={styles.virtualList}>
          <List data={data?.docs} itemKey={(item) => item.id} height={830} itemHeight={120}>
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
