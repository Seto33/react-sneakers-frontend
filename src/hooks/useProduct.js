import useSWR from 'swr';
import { fetcher } from '../helper/fetcher';

export const useProduct = () => {
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_URL}/products`, fetcher)
    const products = data?.length > 0 ? data : [];

    if (error || !data) {
        return {
            products: [],
            isLoading,
            error: error
        }
    }

    return { products, isLoading, error }

}










