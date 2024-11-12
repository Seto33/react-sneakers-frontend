import styles from "./basket.module.css";
import clsx from "clsx";
import {Icon} from "../index";
import { useState } from "react";
import { useBasket } from "@/hooks/useBasket";

const Card = (props) => {
    const {id, imgUrl, title, price} = props
    const [loading, setLoading] = useState(false);
    const {removeProducts} = useBasket();


    const onClickRemoveCard = async () => {
        setLoading(true) 
        await removeProducts(id)
        setLoading(false)
    }
  return (
    <div className={styles.cartItem}>
                    <img className={styles.img} src={imgUrl} alt="Sneakers" />
                    <div className={styles.cartContent}>
                        <p className={styles.cartItemTitle}>{title}</p>
                        <span className={styles.span}>{price} руб.</span>
                    </div>
                    <button
                    disabled={loading} 
                    className={clsx(
                        styles.buttonItemClose,
                        loading && styles.loading,
                    )} 
                    onClick={onClickRemoveCard}>
                        <Icon className={styles.buttonClose} id={"buttonClose"} />
                    </button>
                </div>
  )
}

export default Card
