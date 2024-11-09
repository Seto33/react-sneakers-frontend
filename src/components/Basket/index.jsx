import styles from "./basket.module.css";
import {Icon, Empty} from "../index";
import { useState } from "react";
import { useBasket } from "@/hooks/useBasket";
import { isShowBasket } from "@/store/isShowBasket";
import { useShop } from "@/hooks/useShop";


export const Basket = () => {

    const {shopProductsLength, addShop} = useShop();
    const [isBuy, setIsBuy] = useState(false);
    const {basket, removeProducts, totalPrice, total} = useBasket();
    const {setIsShow, isShow} = isShowBasket();
    
    return(
        <>
        { isShow && <>
        <div onClick = {setIsShow} className={styles.overlay}></div>
        <div className={styles.aside}>
        
            <div className={styles.titleBlock}>
            <h2 className={styles.title}>Корзина</h2>
            <button className={styles.basketClose} onClick = {setIsShow}>X</button>
            </div>

            {
                basket.length > 0 ? 
                <>
                <div className={styles.cartWrapper}>
            {
                basket.map(obj =>(
                <div className={styles.cartItem} key={obj.id}>
                    <img className={styles.img} src={obj.imgUrl} alt="Sneakers" />
                    <div className={styles.cartContent}>
                        <p className={styles.cartItemTitle}>{obj.title}</p>
                        <span className={styles.span}>{obj.price} руб.</span>
                    </div>
                    <button className={styles.buttonItemClose} onClick={() => {
                        removeProducts(obj.id);
                    }}>
                        <Icon className={styles.buttonClose} id={"buttonClose"} />
                    </button>
                </div>
                ))
            }
            </div>
            <div className={styles.items}>
                <ul className={styles.itemsList}>
                    <li className={styles.itemsProps}>
                        <p className={styles.text}>Итого:</p>
                        <div className={styles.dots}></div>
                        <span className={styles.price}>{totalPrice} руб.</span>
                    </li>
                    <li className={styles.itemsProps}>
                        <p className={styles.text}>Налог 5%:</p>
                        <div className={styles.dotsSec}></div>
                        <span className={styles.price}>{total} руб.</span>
                    </li>
                </ul>
                <button className={styles.buttonConfirm} onClick={() => {
                    addShop(basket);
                    setIsBuy(true);
                    }}>Оформить заказ 
                    <Icon className={styles.arrowRight} id={"arrowRight"} />
                </button>
                
            </div>
            </> : 
            <Empty imgUrl = {isBuy ? "img/buy.png" : "img/empty.png"} 
            title = {isBuy ? "Заказ оформлен!" : "Корзина пустая"}  
            text = {isBuy ? `Ваш заказ #${shopProductsLength} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            onClickButton = {setIsShow} />
            }

            
            
        </div>
        </>}
        </>
    )
}
