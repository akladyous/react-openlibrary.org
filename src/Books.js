import { useReducer, useCallback } from "react";
import useGetRequest from "./hooks/useGetRequest.js";

const ACTION = {
    CHANGE_QUERY: "change_query",
    CHANGE_FILTER: "change_filter",
};

const initialState = {
    filter: {
        author: "",
        first_publish_year: "",
        publisher: "",
        language: "",
    },
    search: {
        query: "",
        pageNumber: 1,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.CHANGE_FILTER: {
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [action.name]: action.payload,
                },
            };
        }
        case ACTION.CHANGE_QUERY: {
            return {
                ...state,
                search: {
                    ...state.search,
                    [action.name]: action.payload,
                },
            };
        }
        // eslint-disable-next-line no-fallthrough
        default: {
            return state;
        }
    }
};

export default function Books() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        loading,
        error,
        stateMessage,
        data: books,
    } = useGetRequest(state.search.query, state.search.pageNumber);

    const handleQueryUpdate = useCallback((e) => {
        dispatch({
            type: ACTION.CHANGE_QUERY,
            name: e.target.name,
            payload: e.target.value,
        });
    }, []);

    const handleFilterUpdate = useCallback((e) => {
        dispatch({
            type: ACTION.CHANGE_FILTER,
            name: e.target.name,
            payload: e.target.value,
        });
    }, []);

    return (
        <div className="container w-75 mt-5">
            <div className="row my-2">
                <div className="col-12 px-1">
                    <div className="input-group">
                        <div className="flex-grow-1 form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInputGrid"
                                aria-label="search title"
                                aria-describedby="basic-addon2"
                                placeholder="search title"
                                name="query"
                                value={state.search.query}
                                onChange={handleQueryUpdate}
                            />
                            <label htmlFor="floatingInputGrid">
                                Search Title
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn btn-outline-secondary btn-lg"
                            disabled={loading}
                        >
                            {loading ? "loading" : "search"}
                        </button>
                    </div>
                </div>
            </div>
            {/* ---------------------------------------------------------------- */}
            <div className="row g-12">
                <div className="col-3 px-1">
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            id="floatingInputGrid"
                            // placeholder="filter by book name"
                            name="author"
                            value={state.filter.author}
                            onChange={handleFilterUpdate}
                        ></input>
                        <label htmlFor="floatingInputGrid">
                            filter by author
                        </label>
                    </div>
                </div>

                <div className="col-3 px-1">
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            id="floatingInputGrid"
                            // placeholder="filter by book name"
                            name="first_publish_year"
                            value={state.filter.first_publish_year}
                            onChange={handleFilterUpdate}
                        ></input>
                        <label htmlFor="floatingInputGrid">
                            filter by year published year
                        </label>
                    </div>
                </div>

                <div className="col-3 px-1">
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            id="floatingInputGrid"
                            // placeholder="filter by book name"
                            name="publisher"
                            value={state.filter.publisher}
                            onChange={handleFilterUpdate}
                        ></input>
                        <label htmlFor="floatingInputGrid">
                            filter by publisher
                        </label>
                    </div>
                </div>

                <div className="col-3 px-1">
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="text"
                            id="floatingInputGrid"
                            // placeholder="filter by book name"
                            name="language"
                            value={state.filter.language}
                            onChange={handleFilterUpdate}
                        ></input>
                        <label htmlFor="floatingInputGrid">
                            filter by language
                        </label>
                    </div>
                </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            <div className="row g-12">
                {books !== null ? (
                    <ul className="list-group">
                        {books.docs.map((book, index) => {
                            return (
                                <li
                                    className="list-group-item py-1 border-0"
                                    key={book.key}
                                >
                                    {book.title}
                                </li>
                            );
                        })}
                    </ul>
                ) : null}
            </div>
        </div>
    );
};
