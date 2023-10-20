import { useEffect, useState } from 'react';
import NewsContext from './NewsContext';
import { NewsResponse } from '../types';

type NewsProviderProps = {
  children: React.ReactNode,
};

const initialNewsState: NewsResponse = {
  count: 0,
  page: 1,
  totalPages: 1,
  nextPage: 1,
  previousPage: 0,
  showingFrom: 0,
  showingTo: 0,
  items: [],
};

export default function NewsProvider({ children }: NewsProviderProps) {
  const [news, setNews] = useState(initialNewsState);

  const url = `https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=${100}`;

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        setNews(data);
      }
    };
    fetchNews();
  }, [url]);
  const value = {
    news,
    setNews,
  };
  return (
    <NewsContext.Provider value={ value }>
      { children }
    </NewsContext.Provider>
  );
}
