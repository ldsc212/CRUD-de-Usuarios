import { useEffect, useState } from "react"
import { useCrud } from "./hooks/useCrud"
import UserContent from "./components/UserContent"
import Form from "./components/Form"
import Modal from "./components/Modal"
import { useModal } from "./hooks/useModal"
import { AiOutlineUserAdd } from "react-icons/ai";
import './App.css'
import Footer from "./components/Footer";
import { usePagination } from "./hooks/usePagination"
import Pagination from "./components/Pagination"

const baseUrl = 'https://users-crud-api-production-9c59.up.railway.app/api/v1/users'

function App() {
  const [
    users,
    loading,
    error,
    { getAll, create, update, remove }
  ] = useCrud(baseUrl)

  const { isOpen, openModal, closeModal, modalContent, setModalContent } = useModal()

  const [selectedUser, setSelectedUser] = useState(null)

  // Hook de paginación
  const {
    page,
    totalPages,
    items: paginatedUsers,
    prev,
    next
  } = usePagination(users)

  useEffect(() => {
    getAll()
  }, [])

  const handleCreate = (dataForm) => {
    create(dataForm)
    closeModal()
  }

  const handleAdd = () => {
    openModal()
    setModalContent(
      <Form onSubmit={handleCreate} />
    )
  }

  const handleDelete = (user) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)
    if (confirmDelete) {
      remove(user.id)
    }
  }

  const handleCancel = () => {
    setSelectedUser(null)
    closeModal()
  }

  const handleUpdate = (dataForm) => {
    update(dataForm.id, dataForm)
    setSelectedUser(null)
    closeModal()
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    openModal()
    setModalContent(
      <Form
        onSubmit={handleUpdate}
        onCancel={handleCancel}
        user={user}
      />
    )
  }

  return (
    <div className="App">

      <div style={{ display: 'flex', justifyContent: 'center', Top: 32, marginBottom: -111 }}>
        <img src="/logo.png" alt="Logo" className="logo-filter" style={{ width: 125, height: 120, objectFit: 'contain' }} />
      </div>
      <div className="header">
        <h1 className="title">User CRUD</h1>

        <button onClick={handleAdd} className="btn btn-primary">
          <AiOutlineUserAdd style={{ marginRight: 5 }} />

          Add Users
        </button>
      </div>

      {/*Error Message*/}
      {error && <p className="errors">{error}</p>}

      {/*User List*/}
      {loading ? <p>Loading...</p> : users && (
        <>
          <UserContent
            users={paginatedUsers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            prev={prev}
            next={next}
          />
        </>
      )}

      <Modal openModal={isOpen} closeModal={closeModal}>
        {modalContent}
      </Modal>
      <Footer />
    </div>
  )
}



export default App
