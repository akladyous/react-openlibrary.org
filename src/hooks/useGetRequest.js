import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetRequest(props) {
    const {url} = props || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);
    const [data, setData] = useState([]);


    useEffect(() =>{
        const controller = new AbortController();
        (async () => {
            setLoading(true)
            const config = {
                headers: { "Content-type": "application/json" },
                signal: controller.signal,
            };
            const response = await axios.get(url, config);
            return response
        })()
        .then(response => {
            setLoading(false)
            if(response && response.status === 200){
                setStateMessage("completed")
                setData(response.data)
            } else {
                setError(true)
                setStateMessage("error")
            };
        })
        .catch(error =>{
            setLoading(false)
            setError(true)
            if(error.resonse.data.hasOwnProperty("error")){ //backend error / internal error
                setStateMessage(error.response.data.error)
            } else {
                setStateMessage(error.message) //query backend error
            }
        })
        .finally(() => {
            controller.abort()
        })
    }, [] );
    return {loading, error, stateMessage, data};
};
