import { useState, useCallback } from "react";
import useGetRequest from "./hooks/useGetRequest.js";

const Spinner = ()=>{
    return(
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    )
}

function App() {
    const [query, setQuery] = useState("")
    const [pageNumber, setPageNumber] = useState(1)
    const { 
        loading,
        error,
        stateMessage, 
        data: books
    } = useGetRequest(query, pageNumber)

    if(!loading){
        console.log("loading: " , loading, " error: ", error, " stateMessage: ", stateMessage);
        console.log(books)
        console.log("--------------------------------")
    }

    const handleChange = (e) =>{
        setQuery(e.target.value)
        setPageNumber(1)
    }
    return (
        <div className="container w-75 mt-5">
            <div className="row g-12 my-2">
                <div className="col-10 px-1">
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            id="floatingInputGrid"
                            placeholder="search title"
                            value={query}
                            onChange={handleChange}
                        ></input>
                        <label htmlFor="floatingInputGrid">Search Title</label>
                    </div>
                </div>

                <div className="col-2">
                    <button
                        type="submit"
                        className="btn btn-primary btn-lg py-2 my-1"
                        disabled={loading}
                    >
                        {loading ? "loading" : "search"}
                    </button>
                </div>
            </div>

            <div className="row g-12">
                <ul className="list-group">
                    {books.docs.map((book, index) => {
                        return (
                            <li className="list-group-item py-1 border-0" key={book.key}>
                                {book.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
