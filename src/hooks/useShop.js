import useSWR from 'swr';
import { fetcher } from '../helper/fetcher';
import { useSWRConfig } from "swr";
import { OBJECT } from 'swr/_internal';


export const useShop = () => {
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_URL}/shop`, fetcher)
    const shop = data?.length > 0 ? data?.map(obj => Object.values(obj)) : [];
    const {mutate} = useSWRConfig();

    if (error || !data) {
        return {
            shop: [],
            isLoading,
            addShop: () => {},
            shopProductsLength: 0,
            error: error
        }
    }

    const addShop = async (products) => {

        
      await fetch(`${import.meta.env.VITE_API_URL}/shop`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({...products}),
      })
      mutate(`${import.meta.env.VITE_API_URL}/shop`, [...shop, ...products] 
            );
    
        products.forEach( async element => {
         
          await fetch(`${import.meta.env.VITE_API_URL}/basket/${element.id}`, {
            method: "DELETE"
          })
          mutate(`${import.meta.env.VITE_API_URL}/basket`, [])
 
        });
      };
    
      const shopProductsLength = shop.length

    return { shop, isLoading, error, addShop, shopProductsLength }

}