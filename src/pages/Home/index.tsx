import { useContext, useEffect, useState } from 'react';
import NewsContext from '../../context/NewsContext';
import NewsCard from '../../components/NewsCard';
import { MainNewsItem, NewsItem } from '../../types';
import Header from '../../components/Header';
import MainNewsCard from '../../components/MainNewsCard';
import style from './style.module.css';

function Home() {
  const { news } = useContext(NewsContext);
  const [apiNews, setApiNews] = useState<NewsItem[] | null>(null);
  const [mainNews, setMainNews] = useState<MainNewsItem | null>(null);
  const [quantity, setQuantity] = useState(9);

  useEffect(() => {
    setApiNews(news.items.slice(0, quantity + 1));
    setMainNews(news.items[0]);
  }, [news, quantity]);

  const filters = ['Mais Recentes', 'Release', 'Notícia', 'Favoritas'];
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const handleFilters = (filter: string) => {
    setSelectedFilter(filter);
    let filteredNews = [...news.items];
    let storageData;

    switch (filter) {
      case 'Mais Recentes':
        filteredNews = filteredNews.sort((a, b) => {
          const dataA = new Date(
            a.data_publicacao.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'),
          );
          const dataB = new Date(
            b.data_publicacao.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'),
          );
          return Number(dataB) - Number(dataA);
        });
        break;
      case 'Release':
        filteredNews = filteredNews.filter((eachNews) => eachNews.tipo === 'Release');
        break;
      case 'Notícia':
        filteredNews = filteredNews.filter((eachNews) => eachNews.tipo === 'Notícia');
        break;
      case 'Favoritas':
        storageData = localStorage.getItem('favorites');
        if (storageData) {
          const favoritos = JSON.parse(storageData);
          filteredNews = filteredNews.filter((eachNews) => favoritos[eachNews.id]);
        }
        break;
      default:
        break;
    }
    setApiNews(filteredNews);
  };

  const handleQuantity = () => {
    const newQuantity = 6;
    setQuantity(quantity + newQuantity);
  };

  return (
    <main>
      <Header />
      { mainNews && (
        <MainNewsCard />
      ) }
      <section className={ style.HomeMainSection }>
        <div className={ style.HomeFilterDiv }>
          <button
            className={
              `${selectedFilter === filters[0] ? style.HomeFilterBtnTrue
                : style.HomeFilterBtnFalse}`
            }
            onClick={ () => handleFilters(filters[0]) }
          >
            Mais Recentes
          </button>

          <button
            className={
              `${selectedFilter === filters[1] ? style.HomeFilterBtnTrue
                : style.HomeFilterBtnFalse}`
            }
            onClick={ () => handleFilters(filters[1]) }
          >
            Release
          </button>

          <button
            className={
              `${selectedFilter === filters[2] ? style.HomeFilterBtnTrue
                : style.HomeFilterBtnFalse}`
            }
            onClick={ () => handleFilters(filters[2]) }
          >
            Notícia
          </button>

          <button
            className={
              `${selectedFilter === filters[3] ? style.HomeFilterBtnTrue
                : style.HomeFilterBtnFalse}`
            }
            onClick={ () => handleFilters(filters[3]) }
          >
            Favoritas
          </button>
        </div>
        <div className={ style.HomeCardDiv }>
          { apiNews && apiNews.length > 0 ? (
            apiNews.map((eachNews, index) => (
              index !== 0 && (
                <div className={ style.HomeNewCardDiv } key={ eachNews.id }>
                  <NewsCard newsItem={ eachNews } />
                </div>
              )
            ))
          ) : (
            <p>Carregando...</p>
          ) }
        </div>
        { selectedFilter !== 'Favoritas' && (
          <div className={ style.HomeMoreNewsDiv }>
            <button className={ style.HomeMoreNewsBtn } onClick={ handleQuantity }>
              Mais notícias
            </button>
          </div>
        ) }
      </section>
    </main>
  );
}

export default Home;
