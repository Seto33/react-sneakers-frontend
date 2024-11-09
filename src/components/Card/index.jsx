import clsx from "clsx";
import {Icon} from "../index";
import styles from "./card.module.css";
import {useFavorite} from "@/hooks/useFavorite";
import { useBasket } from "@/hooks/useBasket";
import { useLocation } from "react-router-dom";


export const Card = (props) => {

  const {addFavorite, isSomeFavorite, removeFavorite} = useFavorite();

    const { id, imgUrl, title, price} = props;
    const {addProduct, isSomeProduct} = useBasket();
    const location = useLocation().pathname;
  
    return (
      <article className={styles.item}>
                {
                location !== "/shop" && 
                <button
                  className={clsx(
                    styles.favoriteButton,
                    (isSomeFavorite(id) || location === "/favorite") && styles.favoriteButtonActive
                  )}
                  onClick={() => {
                    location === "/favorite" ? removeFavorite(id) :
                    addFavorite({productId: id, imgUrl, title, price})}}
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
                  className={clsx(
                    styles.plusButton, 
                    isSomeProduct(id) && styles.plusButtonActive)} 
                    onClick={() => {
                      console.log({imgUrl, title, price, id});
                      
                      addProduct({imgUrl, title, price, productId: id});
                    }}
                    
                    >  
                    <Icon className={styles.plus} id={isSomeProduct(id) ? "checked" : "plus"} />
                  </button>}
                </div>
              </article>
          
    );
  };
