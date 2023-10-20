import { useContext, useEffect, useState } from 'react';
import { MainNewsItem } from '../../types';
import fullHeart from '../../assets/full-heart.svg';
import emptyHeart from '../../assets/empty-heart.svg';
import style from './style.module.css';
import NewsContext from '../../context/NewsContext';

type FavoritesType = {
  [key: number]: {
    titulo: string;
    introducao: string;
    data_publicacao: string;
  };
};

function MainNewsCard() {
  const { news } = useContext(NewsContext);
  const [newsItem, setNewsItem] = useState<MainNewsItem>();
  const [favorite, setFavorite] = useState(false);
  const [img, setImg] = useState<string>();

  useEffect(() => {
    setNewsItem(news.items[0]);
  }, [news]);

  const handleFavorites = (id: number) => {
    const storageData = localStorage.getItem('favorites');
    let favorites: FavoritesType = {};

    if (storageData) {
      favorites = JSON.parse(storageData);
    }

    if (favorites[id]) {
      delete favorites[id];
      setFavorite(false);
    } else {
      favorites[id] = {
        titulo: (newsItem as MainNewsItem).titulo,
        introducao: (newsItem as MainNewsItem).introducao,
        data_publicacao: (newsItem as MainNewsItem).data_publicacao,
      };
      setFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  useEffect(() => {
    const favoritesData = localStorage.getItem('favorites');
    if (favoritesData) {
      const favorites = JSON.parse(favoritesData);
      if (favorites[(newsItem as MainNewsItem)?.id]) {
        setFavorite(true);
      }
    }
    if (newsItem?.imagens) setImg(JSON.parse(newsItem.imagens as any).image_fulltext);
  }, [newsItem]);

  const url = `http://agenciadenoticias.ibge.gov.br/${img}`;
  return (
    <div className={ style.MainNewsMainSection }>
      <img
        className={ style.MainNewsImg }
        src={ url }
        alt="img"
      />
      <div className={ style.MainNewsTextDiv }>
        <div className={ style.MainNewsTextAndFavorite }>
          <p className={ style.MainNewsRecentText }>Notícia mais recente</p>
          <button
            className={ style.MainNewsFavoriteBtn }
            onClick={ () => handleFavorites((newsItem as MainNewsItem).id) }
          >
            <img
              className={ style.MainNewsFavoriteImg }
              src={ favorite ? fullHeart : emptyHeart }
              alt="favoritar"
            />
          </button>
        </div>
        <h3 className={ style.MainNewsTitle }>
          { newsItem?.titulo }
        </h3>
        <p className={ style.MainNewsDescription }>
          { newsItem?.introducao }
        </p>
        <p className={ style.MainNewsDate }>
          { `Data de publicação: ${newsItem?.data_publicacao.slice(0, 10)}` }
        </p>
        { newsItem && (
          <button
            className={ style.MainNewsButton }
          >
            Leia a notícia aqui
          </button>
        ) }
      </div>
    </div>
  );
}

export default MainNewsCard;
