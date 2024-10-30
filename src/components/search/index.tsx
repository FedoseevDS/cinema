import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import searchImg from 'assets/search.png';

import styles from './styles.module.scss';

type SearchProps = {
  value: string;
  option: string[];
  onChange: any;
};

const Search = ({ onChange, value, option }: SearchProps) => {
  const [closePopup, setClosePopup] = useState(true);

  const filteredOptions = useMemo(
    () => option?.filter((i) => i.includes(value)).sort(),
    [option, value],
  );

  const isShowPopup = useMemo(
    () => !!value && !!filteredOptions.length && !closePopup,
    [value, filteredOptions, closePopup],
  );

  const showPopup = useMemo(() => {
    if (filteredOptions.length < 1) {
      return '';
    }

    return (
      <div className={styles.popup}>
        <ul>
          {filteredOptions?.slice(0, 10).map((text: string) => (
            <li
              key={text}
              onClick={(e) => {
                onChange(e);
                setClosePopup(true);
              }}
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    );
  }, [onChange, filteredOptions]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setClosePopup(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <input
        placeholder="Поиск..."
        type="text"
        onChange={onChange}
        value={value}
        onFocus={() =>
          (filteredOptions.includes(value) ||
            filteredOptions.length === 0 ||
            filteredOptions.length > 0) &&
          setClosePopup(false)
        }
      />
      <button>
        <img src={searchImg} alt="значек поиска" />
      </button>
      {(isShowPopup || !closePopup) && showPopup}
    </div>
  );
};

export default Search;
