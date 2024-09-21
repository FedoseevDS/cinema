import styles from './styles.module.scss';

import girlImg from 'assets/girl.png';

const Header = () => (
  <div className={styles.wrapper}>
    <div className={styles.topPannel}>
      <div>
        <span>LOOK</span>
        <span>WHAT</span>
      </div>
    </div>
    <div className={styles.downPannel}>
      <div>
        <div className={styles.content}>
          <span>МЕЖДУНАРОДНАЯ БИБЛИОТЕКА ФИЛЬМОВ</span>
          <p>
            Эта платформа является вашим окончательным ресурсом для навигации по миру кино, позволяя
            вам открывать для себя новые кинематографические приключения
          </p>
          <p>Начните исследовать нашу обширную коллекцию сегодня!</p>
        </div>
        <div className={styles.img}>
          <img src={girlImg} />
        </div>
      </div>
    </div>
  </div>
);

export default Header;
