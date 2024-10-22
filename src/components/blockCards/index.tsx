import { useEffect, useState } from 'react';
import List from 'rc-virtual-list';

import Card from './card';

import styles from './styles.module.scss';

type BlockCardsProps = {
  data: any;
  onButton: any;
};

type MapItem = {
  name: string;
  poster: { previewUrl: string };
  id: number;
};

const BlockCards = ({ data, onButton }: BlockCardsProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowDimensions > 1340) {
      return setContainerHeight(3000);
    }
    if (windowDimensions < 1329 && windowDimensions > 1012) {
      return setContainerHeight(2400);
    }
    if (windowDimensions < 1011 && windowDimensions > 695) {
      return setContainerHeight(1600);
    } else {
      return setContainerHeight(600);
    }
  }, [windowDimensions]);

  return (
    <>
      {data?.length ? (
        <div className={styles.virtualList}>
          <List data={data} itemKey={(item) => item.id} height={containerHeight} itemHeight={120}>
            {(item: MapItem) => (
              <Card key={item.id} name={item.name} poster={item.poster} id={item.id} />
            )}
          </List>
        </div>
      ) : (
        <div>Нет данных</div>
      )}
      <button className={styles.showMore} onClick={onButton}>
        Показать еще
      </button>
    </>
  );
};

export default BlockCards;
