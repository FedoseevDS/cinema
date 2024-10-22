import { useCallback, useEffect, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from 'antd';

import BlockCards from 'components/blockCards';
import ControlPanel from 'components/controlPanel';

import useDebounce from 'hooks/useDebouncedCallback';

import { useGetDataQuery } from 'store/requests';

import { initialState, reducer } from 'reducer';

import styles from './styles.module.scss';

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [showMore, setShowMore] = useState(25);
  const [page, setPage] = useState(1);
  const [valueSelect, setValueSelect] = useState({
    Год: '',
    Жанр: '',
    'Рейтинг Кинопоиска': '',
    Страна: '',
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearchTerm = useDebounce(searchParams.get('search') || '', 750);

  const { Страна: country, Жанр: genre, 'Рейтинг Кинопоиска': rating, Год: year } = valueSelect;

  const { data } = useGetDataQuery({
    params: {
      limit: !debouncedSearchTerm && showMore,
      page,
      ...(country && country !== 'null' ? { 'countries.name': country } : null),
      ...(genre && genre !== 'null' ? { 'genres.name': genre } : null),
      ...(rating && rating !== 'null' ? { 'rating.kp': rating } : null),
      ...(year && year !== 'null' ? { year } : null),
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
      const value = event.target.value || event.target.textContent;

      if (value) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set('search', value);
          const keysToDelete = ['Жанр', 'Страна', 'Год', 'Рейтинг Кинопоиска'];
          keysToDelete.forEach((key) => {
            setValueSelect((e) => ({ ...e, [key]: '' }));
            return newParams.delete(key);
          });
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

  const handleSelectChange = useCallback(
    ({ label, value }: { label: string; value: string }) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set(label, value);
        newParams.delete('search');
        return newParams;
      });
    },
    [setSearchParams],
  );

  useEffect(() => {
    searchParams.forEach((v, k) => {
      setValueSelect((e) => ({ ...e, [k]: v }));
    });
  }, [searchParams]);

  useEffect(() => {
    dispatch({ payload: debouncedSearchTerm, type: 'search' });
  }, [debouncedSearchTerm]);

  return (
    <Layout.Content className={styles.content}>
      <ControlPanel
        onSearchChange={handleSearchChange}
        searchParams={searchParams.get('search') || ''}
        optionSearch={Array.from(state?.search || '')}
        onSelectChange={handleSelectChange}
        valueSelect={valueSelect}
      />
      <div>
        <span>Найдено {data?.docs?.length} результатов,</span>
        <span> Страница {page}</span>
      </div>
      <BlockCards data={data?.docs} onButton={handleButton} />
    </Layout.Content>
  );
};

export default Main;
