/* eslint-disable max-len */
import { Dispatch, SetStateAction, createContext } from 'react';
import { NewsResponse } from '../types';

export type NewsContextType = {
  news: NewsResponse
  setNews: Dispatch<SetStateAction<NewsResponse>>;
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

function init() {
  return () => {};
}

const NewsContext = createContext<NewsContextType>({
  news: initialNewsState,
  setNews: init(),
});

export default NewsContext;
