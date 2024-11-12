import useSWR from 'swr';
import { fetcher } from '../helper/fetcher';

export const useBasket = () => {
    const {data, error, mutate} = useSWR(`${import.meta.env.VITE_API_URL}/basket`, fetcher)
    const basket = data?.length > 0 ? data : [];

    if (error || !data) {
        return{
            totalPrice: 0,
            total: 0,
            addProduct: () => {},
            isFindProductId: () => {},
            isSomeProduct: () => {},
            basket: [],
            error: error
        }
    }

    const isFindProductId = (id) => {
        return basket?.find((obj) => obj.productId === id)?.id;
      }

      const isSomeProduct = (id) => {
        return basket?.some((obj) => obj.productId === id);
      }

    const removeProducts = async (id) => {
        await fetcher(`${import.meta.env.VITE_API_URL}/basket/${id}`, {
          method: "DELETE"
        })
        mutate(basket.filter((obj) => obj.id !== id),
        )
        }
    
      const addProduct = async (product) => {
        if (isSomeProduct(product.productId)) {
          
          return;
        }
        
        await fetcher(`${import.meta.env.VITE_API_URL}/basket`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(product)
      }),
        
        mutate([...basket, product])
    }

        const totalPrice = basket.reduce((sum, obj) => obj.price + sum, 0);
        const total = totalPrice *5 / 100;

    return {
        totalPrice,
        total,
        removeProducts,
        addProduct,
        isFindProductId,
        isSomeProduct,
        basket,
        error,
    }
}