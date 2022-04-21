import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetRequest(query, pageNumber) {
    // const {url} = props || {};

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() =>{
        console.log("useEffect -----------------")
        setLoading(true);
        // if(query.length === 0) return;
        const controller = new AbortController();
        const config = {
            method: "GET",
            signal: controller.signal,
            url: "http://openlibrary.org/search.json",
            headers: { "Content-type": "application/json" },
            params: { q: query, page: pageNumber },
        };
        axios(config)
        .then(response => {
            setStateMessage("completed")
            setData(response.data)
            setLoading(false)
        })
        .catch(error =>{
            if(axios.isCancel(error)){
                setStateMessage("http request canceled")
            } else {
                if(error.resonse.data.hasOwnProperty("error")){ //backend error / internal error
                    setStateMessage(error.response.data.error)
                } else {
                    setStateMessage(error.message) //query backend error
                }
            }; // END - http request canceled
            setError(true)
        })
        // .finally(() => {
        //     setLoading(false)
        //     controller.abort()
        // });
        
        return ()=>{ 
            setLoading(false);
            controller.abort()
        }
    }, [query, pageNumber] );

    return {loading, error, stateMessage, data};
};
