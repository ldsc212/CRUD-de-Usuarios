import './Modal.css'

function Modal({ openModal, closeModal, children }) {
    return (
        <div className={`modal ${openModal ? 'show-modal' : ''}`} onClick={closeModal}>
            <button onClick={closeModal}>X</button>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal