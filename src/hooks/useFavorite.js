import useSWR from 'swr';
import { fetcher } from '../helper/fetcher';



export const useFavorite = () => {
    const { data, error, mutate, isLoading } = useSWR(`${import.meta.env.VITE_API_URL}/favorite`, fetcher)

    const favorites = data?.length > 0 ? data : [];

    if (error || !data) {
        return{
            addFavorite: () => {},
            isFindFavoriteId: () => {},
            isSomeFavorite: () => {},
            removeFavorite: () => {},
            favorites: [],
            isLoading,
            error: error
        }
    }

    const isFindFavoriteId = (id) => {
        return favorites?.find((obj) => obj.productId === id)?.id;
    }

    const isSomeFavorite = (id) => {
        return favorites?.some((obj) => obj.productId === id);
    }

    const removeFavorite = (id) => {
        const isRemoveFavoriteId = isSomeFavorite(id) ? isFindFavoriteId(id) : id;
        mutate(
            fetcher(`${import.meta.env.VITE_API_URL}/favorite/${isRemoveFavoriteId}`, {
                method: "DELETE"
            })
        ) 
    }
    
    const addFavorite = (product) => {

        if(isSomeFavorite(product.productId)){
            removeFavorite(product.productId);
            return;
        }

        mutate(
            fetcher(`${import.meta.env.VITE_API_URL}/favorite`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(product)
            })
        )
    }

    return {
        addFavorite,
        isFindFavoriteId,
        isSomeFavorite,
        removeFavorite,
        favorites,
        error: error,
        isLoading
    }

}