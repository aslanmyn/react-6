import { Link } from 'react-router-dom'
import './card.css'

export default function Card({ item }) {
    return (
        <article className="card">
            <img src={item.thumbnail} alt={item.title} />
            <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.description?.slice(0, 100)}...</p>
                <p><strong>${item.price}</strong> · ⭐ {item.rating} · {item.category}</p>
                <Link to={`/items/${item.id}`}>Details</Link>
            </div>
        </article>
    )
}
