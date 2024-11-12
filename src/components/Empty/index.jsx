import styles from "./empty.module.css";
import {Icon} from "../index";
import clsx from "clsx";
import { useNavigate, useLocation } from 'react-router-dom';




export const Empty = (props) => {
    const {imgUrl, title, text, onClickButton = () => {}, size} = props;
    const navigate = useNavigate();
    const location = useLocation().pathname;
    
    return(
    <div className={styles.cardEmpty}>
    <img className={clsx(styles.emptyImg, size === "small" && styles.emptyFavoriteImg)} src={imgUrl} alt="Empty" />
    <h2 className={styles.emptyTitle}>{title}</h2>
    <p className={styles.emptyText}>{text}</p>
    <button onClick = {() =>{onClickButton(); location !== "/" && navigate(-1)}} 
    className={styles.buttonBack}>Вернуться назад 
        <Icon className={styles.arrowLeft} id={"arrowLeft"} />
    </button>
</div>
)}
