import React, { useEffect, useMemo, useRef, useState } from 'react';

import searchImg from 'assets/search.png';

import styles from './styles.module.scss';

type SearchProps = {
  value: string;
  option: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPopupClick: (e: any) => any;
};

const Search = ({ onChange, onPopupClick, value, option }: SearchProps) => {
  const [closePopup, setClosePopup] = useState(false);

  const filteredOptions = useMemo(
    () => option.filter((i) => i.includes(value)).sort(),
    [option, value],
  );

  const isShowPopup = useMemo(
    () => !!value && !!filteredOptions.length && !closePopup,
    [value, filteredOptions, closePopup],
  );

  const showPopup = useMemo(
    () => (
      <div className={styles.popup}>
        <ul>
          {filteredOptions?.slice(0, 10).map((text: string) => (
            <li
              key={text}
              onClick={(e) => {
                onPopupClick(e);
                setClosePopup(true);
              }}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    ),
    [onPopupClick, filteredOptions],
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setClosePopup(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <input
        placeholder="Поиск..."
        type="text"
        onChange={onChange}
        value={value}
        onFocus={() => setClosePopup(false)}
      />
      <button>
        <img src={searchImg} alt="значек поиска" />
      </button>
      {(isShowPopup || !closePopup) && showPopup}
    </div>
  );
};

export default Search;
