import { Header as LayoutHeader } from 'antd/es/layout/layout';

import girlImg from '../../assets/girl.png';

import styles from './styles.module.scss';

const Header = () => {
  return (
    <LayoutHeader className={styles.wrapper}>
      <div className={styles.topPannel}>
        <div>
          <span>LOOK</span>
          <span>WHAT</span>
        </div>
      </div>
      <div className={styles.downPannel}>
        <div className={styles.leftPannel}>
          <div>
            <span>МЕЖДУНАРОДНАЯ БИБЛИОТЕКА ФИЛЬМОВ</span>
            <p>
              Эта платформа является вашим окончательным ресурсом для навигации по миру кино,
              позволяя вам открывать для себя новые кинематографические приключения
            </p>
            <p>Начните исследовать нашу обширную коллекцию сегодня!</p>
          </div>
        </div>
        <div className={styles.rightPannel}>
          <div>
            <img src={girlImg} />
          </div>
        </div>
      </div>
    </LayoutHeader>
  );
};

export default Header;
