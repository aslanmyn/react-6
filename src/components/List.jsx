import './list.css'
import Card from './Card'

export default function List({ items }) {
    if (!items?.length) return <p>No results</p>
    return (
        <div className="grid">
            {items.map((it) => <Card key={it.id} item={it} />)}
        </div>
    )
}
