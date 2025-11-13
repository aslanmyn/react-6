import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchItems } from '../services/itemsService'
import Spinner from '../components/Spinner'
import ErrorBox from '../components/ErrorBox'
import List from '../components/List'

export default function ItemsList() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') || ''
    const [items, setItems] = useState([])
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState('')

    useEffect(() => {
        let ignore = false
        ;(async () => {
            try {
                setStatus('loading')
                const res = await searchItems(q)
                if (!ignore) {
                    setItems(res)
                    setStatus('idle')
                }
            } catch (e) {
                if (!ignore) {
                    setError(e.message)
                    setStatus('error')
                }
            }
        })()
        return () => { ignore = true }
    }, [q])

    function onChange(e) {
        const val = e.target.value
        if (val) setSearchParams({ q: val })
        else setSearchParams({})
    }

    return (
        <section>
            <h1>Items</h1>
            <input
                type="search"
                placeholder="Search..."
                value={q}
                onChange={onChange}
                aria-label="Search items"
            />
            {status === 'loading' && <Spinner />}
            {status === 'error' && <ErrorBox message={error} />}
            {status === 'idle' && <List items={items} />}
        </section>
    )
}
