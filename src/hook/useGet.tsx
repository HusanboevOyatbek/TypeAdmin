import axios from "axios"
import { useEffect, useState } from "react"

function useGet({ url } :{url:string}) {

    const [data , setData]:[[] , React.Dispatch<React.SetStateAction<[]>>] = useState([])

    const getData  = async() => {
        try{
            let res = await axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/${url}`);
            setData(res.data);
            
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(() => {
        getData()
    }, [url] )

  return data;

}

export default useGet