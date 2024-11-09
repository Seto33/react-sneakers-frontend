import {Icon} from "../index";
import styles from "./search.module.css";


// eslint-disable-next-line react/prop-types
export const Search = ({value, setValue}) => {
      const onChange = (event)=>{
        setValue(event.target.value)
      }
  return (
    <label className={styles.label}>
      <Icon className={styles.icon} id="search" />
      <input className={styles.input} 
      value={value} 
      onChange={onChange} 
      type="text" 
      placeholder="Поиск..." 
      />
    </label>
  )
}


