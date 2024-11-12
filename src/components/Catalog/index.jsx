import { Children, useState } from "react";
import {Search, Card} from "../index";
import styles from "./catalog.module.css";
import { useLocation } from "react-router-dom";
import Skeleton from "../Card/Skeleton";



export const Catalog = (props) => {

  const {products, children} = props;
  const [searchValue, setSearchValue] = useState("");
  const sneakers = products
  .filter(obj => obj.title?.toLowerCase().includes(searchValue.toLowerCase()))
  .map((obj, index) => (
    <li className={styles.item} key={index}>
      <Card {...obj} />
    </li>     
  ))

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
          {useLocation().pathname === "/" && <Search value={searchValue} setValue={setSearchValue} />}
        </div>
        <ul className={styles.list}>
            {products.length > 0 ? sneakers : skeletons}
          </ul>
        
      </div>
    </section>
  );
};
