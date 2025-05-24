function Pagination({ page, totalPages, prev, next }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '0 0 20px 0', marginTop: '-60px' }}>
            <button onClick={prev} disabled={page === 1} aria-label="Anterior">
                &#8592;
            </button>
            <span style={{ alignSelf: 'center' }}>
                {page}
            </span>
            <button onClick={next} disabled={page === totalPages || totalPages === 0} aria-label="Siguiente">
                &#8594;
            </button>
        </div>
    )
}

export default Pagination