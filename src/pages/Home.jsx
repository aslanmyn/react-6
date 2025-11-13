export default function Home() {
    return (
        <section>
            <h1>Welcome</h1>
            <p>
                This is a simple catalog with search (<code>?q=</code>) and details powered by the
                public DummyJSON API. Use the “Items” page to explore products.
            </p>

            <img
                src="/home.png"
                alt="preview"
                onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/800/400";
                }}
                style={{
                    maxWidth: 420,
                    width: '100%',
                    borderRadius: 12,
                    border: '1px solid #eee',
                    marginTop: 12,
                }}
            />
        </section>
    );
}
