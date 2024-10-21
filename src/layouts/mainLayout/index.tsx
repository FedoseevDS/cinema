import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Header from 'components/header';

import styles from './styles.module.scss';

const MainLayout = () => (
  <Layout className={styles.wrapper}>
    <Header />
    <Outlet />
  </Layout>
);

export default MainLayout;
