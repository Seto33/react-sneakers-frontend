import React from 'react';
import {Catalog, Empty} from '../components';
import { useFavorite } from '../hooks/useFavorite';
import { useNavigate } from 'react-router-dom';

const Favorite = () => {

    const {favorites, isLoading, error} = useFavorite();

    if (error) return <h1>Произошла ошибка</h1>
  
    const navigate = useNavigate();
  return (
    
    <main style={{display: "grid"}}>
{favorites.length > 0 ?
    <Catalog 
    products = {favorites}
    isLoading = {isLoading}
    >
        <h2>Мои закладки</h2>
    </Catalog> :

  <div className="container" style={{display: "flex"}}>
  <Empty imgUrl = "img/emptyFavorite.png" 
          title = "Закладок нет :(" 
          text = "Вы ничего не добавляли в закладки"
          size = "small"
          onClickButton = {() => navigate(-1)}
          />
          </div>
 }
    </main>
    
  )
}
export default Favorite