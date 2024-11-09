import useSWR from 'swr';
import { fetcher } from '../helper/fetcher';
import { useSWRConfig } from "swr";


export const useShop = () => {
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_URL}/shop`, fetcher)
    const shop = data?.length > 0 ? data : [];
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

    const addShop = (products) => {
        mutate(`${import.meta.env.VITE_API_URL}/shop`, 
            fetch(`${import.meta.env.VITE_API_URL}/shop`, {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify(products),
        }));
    
        products.forEach(element => {
         mutate(`${import.meta.env.VITE_API_URL}/basket`,
          fetch(`${import.meta.env.VITE_API_URL}/basket/${element.id}`, {
          method: "DELETE"
        })
         ) 
        });
      };
    
      const shopProductsLength = shop.length

    return { shop, isLoading, error, addShop, shopProductsLength }

}