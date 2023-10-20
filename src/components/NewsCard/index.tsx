import { useEffect, useState } from 'react';
import { NewsItem } from '../../types';
import fullHeart from '../../assets/full-heart.svg';
import emptyHeart from '../../assets/empty-heart.svg';
import style from './style.module.css';

type FavoritesType = {
  [key: number]: {
    titulo: string;
    introducao: string;
    data_publicacao: string;
  };
};

function NewsCard({ newsItem }: { newsItem: NewsItem }) {
  const [favorite, setFavorite] = useState(false);

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
        titulo: newsItem.titulo,
        introducao: newsItem.introducao,
        data_publicacao: newsItem.data_publicacao,
      };
      setFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  useEffect(() => {
    const favoritesData = localStorage.getItem('favorites');
    if (favoritesData) {
      const favorites = JSON.parse(favoritesData);
      if (favorites[newsItem.id]) {
        setFavorite(true);
      }
    }
  }, [newsItem]);

  return (
    <div className={ style.NewCardMainDiv }>
      <h3 className={ style.NewCardTitle }>
        { `${newsItem.titulo.slice(0, 70)}...` }
      </h3>
      <button
        className={ style.NewCardFavBtn }
        onClick={ () => handleFavorites(newsItem.id) }
      >
        <img src={ favorite ? fullHeart : emptyHeart } alt="favoritar" />
      </button>
      <p className={ style.NewCardDescription }>
        { newsItem.introducao }
      </p>
      <div className={ style.NewCardDateAndBtn }>
        <p className={ style.NewCardDate }>
          { `Publicação: ${newsItem.data_publicacao.slice(0, 10)}` }
        </p>
        <button className={ style.NewCardDetailsBtn }>
          Leia a notícia aqui
        </button>
      </div>
    </div>
  );
}

export default NewsCard;
