import styles from "./basket.module.css";
import {Icon, Empty} from "../index";
import { useState, useEffect } from "react";
import { useBasket } from "@/hooks/useBasket";
import { isShowBasket } from "@/store/isShowBasket";
import { useShop } from "@/hooks/useShop";
import Card from "./Card"


export const Basket = () => {

    const {shopProductsLength, addShop} = useShop();
    const [isBuy, setIsBuy] = useState(false);
    const {basket, totalPrice, total} = useBasket();
    const {setIsShow, isShow} = isShowBasket();
    
    useEffect(() => {
        return () => setIsBuy(false)
    }, [isShow])

    const onClickBuy = async () => {
        setIsBuy(true)
        await addShop(basket)
    }
    
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
                <Card key = {obj.id} {...obj} />
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
                <button 
                disabled={isBuy}
                style = {{opacity: isBuy && "0.5"}}
                className={styles.buttonConfirm} 
                onClick={onClickBuy}>
                    Оформить заказ 
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
