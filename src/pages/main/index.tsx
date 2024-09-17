import React from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import Header from '../../components/header';
import Search from '../../components/search';
import Select from '../../components/select';

import styles from './styles.module.scss';

const Main: React.FC = () => {
  return (
    <Layout className={styles.wrapper}>
      <Header />
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
        <div>Найдено 0 результатов</div>
        <div>Карточки</div>
      </Content>
    </Layout>
  );
};

export default Main;
