import React from 'react';
import {Catalog, Empty} from '../components';
import { useNavigate } from 'react-router-dom'; 
import { useShop } from '../hooks/useShop';

const Shop = () => {
    const {shop, error} = useShop();
    if (error) return <h1>Произошла ошибка</h1>
    const navigate = useNavigate();

   return (
    <main style={{display: "grid"}}>
   
    {shop?.length > 0 ? 
        <Catalog 
        products = {shop.flat()}>
        <h2>Мои покупки</h2>
        </Catalog>
     :
    <div className="container" style={{display: "flex"}}>
  <Empty imgUrl = "img/noBuy.png" 
          title = "У вас нет заказов" 
          text = "Вы нищеброд? Оформите хотя бы один заказ."
          size = "small"
          onClickButton = {() => navigate(-1)}
          />
          </div>
          }
    </main>
  )
}

export default Shop;
