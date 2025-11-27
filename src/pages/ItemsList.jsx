
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchItems } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";
import List from "../components/List";

export default function ItemsList() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const query = searchParams.get("q") || "";

    const { list, loadingList, errorList } = useSelector((state) => state.items);


    useEffect(() => {
        dispatch(fetchItems(query));
    }, [dispatch, query]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        const params = {};
        if (value) params.q = value;
        setSearchParams(params, { replace: true });
    };

    return (
        <section className="page">
            <h1 className="page-title">Items</h1>

            <div className="items-search">
                <input
                    type="text"
                    className="field-input"
                    placeholder="Search..."
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>

            {loadingList && (
                <div className="items-state">
                    <Spinner />
                </div>
            )}

            {errorList && !loadingList && (
                <div className="items-state error">
                    <p>Failed to load items: {errorList}</p>
                </div>
            )}

            {!loadingList && !errorList && list.length === 0 && (
                <div className="items-state">
                    <p>No items found.</p>
                </div>
            )}

            {!loadingList && !errorList && list.length > 0 && (

                <List items={list} />
            )}
        </section>
    );
}
