import type { GetPropsTypes } from "@/types/GetPropsTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

const useGet = <T = unknown>({url , key}:GetPropsTypes) => {

    const getData = async():Promise<T> => {
        const {data} = await axios.get<T>(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/${url}`);
        return data
    }


    const {data , isLoading, isFetching , error} = useQuery<T>({
        queryKey: key,
        queryFn: getData
    })

  return {data , isLoading , isFetching , error}
}

export default useGet

