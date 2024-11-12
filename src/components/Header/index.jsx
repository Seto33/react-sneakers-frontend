import styles from './header.module.css';
import logoUrl from '@/assets/logo.png';
import {Icon} from '../index';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '@/hooks/useBasket';
import { isShowBasket } from '@/store/isShowBasket';


const navLinks = [
  {
    id: "basket",
    link: "#",
    text: "",
  },
  {
    id: "heart",
    link: "/favorite",
    text: "Закладки",
  },
  {
    id: "man",
    link: "/shop",
    text: "Профиль",
  },
]
export const Header = () => {


 
  const [navIsOpen, setNavIsOpen] = useState(false);
  const {totalPrice} = useBasket();
  const {setIsShow} = isShowBasket();

  const onClickNavLink = (id) => {
    setNavIsOpen(!navIsOpen);
    id === "basket" && setIsShow();
  }

  return (
    <header className={styles.header}>

<div className={styles.container}>
  <Link to="/" className={styles.logo}>
  <img className={styles.logoImg} src={logoUrl} alt="logo" width={45} height={45}/>
  <strong className={styles.logoStrong}>REACT SNEAKERS</strong>
  <span className={styles.logoSpan}>Магазин лучших кроссовок</span>
</Link>

<nav className={navIsOpen ? styles.nav + " " + styles.navActive : styles.nav}>
  <ul className={styles.navList}>
    {
      navLinks.map(obj => (
        <li className={styles.navItem} key={obj.text}>
      <Link className={styles.navLink} 
      onClick = {() => onClickNavLink(obj.id)} 
      to={obj.link}>
        <Icon id={obj.id} className={styles.icon}/>
        {obj.id === "basket" ? `${totalPrice} руб.` : obj.text}
      </Link>
    </li>
      ))
    }
  </ul>
</nav>
<button className={styles.burger} onClick={() => {
  setNavIsOpen(!navIsOpen)
}}>
  <span></span>
  <span></span>
  <span></span>
</button>
</div>
    </header>
  )
}

