import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchItemById, clearSelectedItem } from "../features/items/itemsSlice";
import Spinner from "../components/Spinner";

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedItem, loadingItem, errorItem } = useSelector(
        (state) => state.items
    );

    useEffect(() => {
        dispatch(fetchItemById(id));

        return () => dispatch(clearSelectedItem());
    }, [dispatch, id]);

    if (loadingItem) return <Spinner />;
    if (errorItem) return <p>Error: {errorItem}</p>;
    if (!selectedItem) return <p>Not found</p>;

    return (
        <section className="page">
            <button onClick={() => navigate(-1)} className="btn">← Back</button>

            <h1>{selectedItem.title}</h1>
            <img src={selectedItem.thumbnail} alt={selectedItem.title} />
            <p>{selectedItem.description}</p>
        </section>
    );
}
