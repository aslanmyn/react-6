import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getItemById } from '../services/itemsService'
import Spinner from '../components/Spinner'
import ErrorBox from '../components/ErrorBox'

export default function ItemDetails() {
    const { id } = useParams()
    const nav = useNavigate()
    const [item, setItem] = useState(null)
    const [status, setStatus] = useState('loading')
    const [error, setError] = useState('')

    useEffect(() => {
        let ignore = false
        ;(async () => {
            try {
                const data = await getItemById(id)
                if (ignore) return
                if (!data) { setStatus('notfound'); return }
                setItem(data)
                setStatus('ready')
            } catch (e) {
                if (!ignore) {
                    setError(e.message)
                    setStatus('error')
                }
            }
        })()
        return () => { ignore = true }
    }, [id])

    if (status === 'loading') return <Spinner />
    if (status === 'error') return <ErrorBox message={error} />
    if (status === 'notfound') return (
        <section>
            <p>Item not found.</p>
            <button onClick={() => nav(-1)}>Back</button>
        </section>
    )

    return (
        <section>
            <button onClick={() => nav(-1)}>Back</button>
            <h1 style={{marginTop: 12}}>{item.title}</h1>
            <img
                src={item.thumbnail}
                alt={item.title}
                style={{maxWidth: 420, width: '100%', borderRadius: 12, border: '1px solid #eee', margin: '8px 0 16px'}}
            />
            <ul>
                <li><strong>ID:</strong> {item.id}</li>
                <li><strong>Category:</strong> {item.category}</li>
                <li><strong>Brand:</strong> {item.brand}</li>
                <li><strong>Price:</strong> ${item.price}</li>
                <li><strong>Rating:</strong> {item.rating}</li>
                <li><strong>Stock:</strong> {item.stock}</li>
                <li><strong>Description:</strong> {item.description}</li>
            </ul>
        </section>
    )
}
