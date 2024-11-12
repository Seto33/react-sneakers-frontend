import clsx from "clsx";
import {Icon} from "../index";
import styles from "./card.module.css";
import {useFavorite} from "@/hooks/useFavorite";
import { useBasket } from "@/hooks/useBasket";
import { useLocation } from "react-router-dom";
import { useState } from "react";


export const Card = (props) => {

  const {addFavorite, isSomeFavorite, removeFavorite} = useFavorite();

    const { id, imgUrl, title, price} = props;
    const {addProduct, isSomeProduct} = useBasket();
    const location = useLocation().pathname;
    const [loading, setLoading] = useState(false);
    const [loadingPlus, setLoadingPlus] = useState(false);

    const onClickFavorite = async () => {
      setLoading(true) 
      if(location === "/favorite" && isSomeFavorite(id)){
       await removeFavorite(id)
      }else{
       await addFavorite({productId: id, id, imgUrl, title, price})
      }
      setLoading(false)
    }

    const onClickPlus = async () => {
      setLoadingPlus(true) 
       await addProduct({productId: id, id, imgUrl, title, price})
      setLoadingPlus(false)
    }

  
    return (
      <article className={styles.item}>
                {
                location !== "/shop" && 
                <button
                disabled={loading}
                  className={clsx(
                    styles.favoriteButton,
                    loading && styles.loading,
                    (isSomeFavorite(id) || location === "/favorite") && styles.favoriteButtonActive
                  )}
                  onClick={onClickFavorite}
                >
                  <Icon className={styles.favorite} id="favorite" />
                </button>}
                <img className={styles.img} src={imgUrl} alt="sneakers" />
                <h3 className={styles.itemTitle}>{title}</h3>
                <div className={styles.wrapper}>
                  <span className={styles.span}>Цена:</span>
                  <span className={styles.price}>{price} руб.</span>
                 { 
                 location !== "/shop" && 
                  <button
                  disabled={loadingPlus}
                  className={clsx(
                    styles.plusButton,
                    loadingPlus && styles.loadingPlus, 
                    isSomeProduct(id) && styles.plusButtonActive)} 
                    onClick={onClickPlus}
                    
                    >  
                    <Icon className={styles.plus} id={isSomeProduct(id) ? "checked" : "plus"} />
                  </button>}
                </div>
              </article>
          
    );
  };
