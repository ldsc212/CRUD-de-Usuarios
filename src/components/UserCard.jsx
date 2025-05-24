import { formatDate } from '../lib/utils'
import { FiEdit, FiGift } from "react-icons/fi";
import { AiOutlineUserDelete, AiOutlineMail } from "react-icons/ai";
import './UserCard.css'

function UserCard({ user, onEdit, onDelete }) {
    return (
        <div className='card'>
            {user.image_url && (
                <img src={user.image_url} alt={user.first_name} width={85} heigth={85} />
            )}
            <h2> {user.first_name} {user.last_name}</h2>
            <p><AiOutlineMail /> {user.email}</p>
            <p><FiGift /> {formatDate(user.birthday)}</p>

            <div>
                <button onClick={() => onEdit(user)}>
                    <FiEdit />
                </button>

                <button onClick={() => onDelete(user)} style={{ marginLeft: '10px' }}>
                    <AiOutlineUserDelete />
                </button>
            </div>
        </div>
    )
}
export default UserCard