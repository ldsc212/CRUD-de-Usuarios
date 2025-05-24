import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formatDate } from '../lib/utils'
import './Form.css'

const schema = z.object({
    first_name: z.string().min(1, 'Este campo es requerido'),
    last_name: z.string().min(1, 'Este campo es requerido'),
    email: z.string().min(1, 'Este campo es requerido').email('Email no válido'),
    password: z.string().min(1, 'Este campo es requerido'),
    birthday: z.string().min(1, 'Este campo es requerido'),
    image_url: z.string().url('URL no válida').or(z.literal(''))
})

const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: '',
    image_url: ''
}

function Form({ onSubmit, onCancel, user = null }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues
    })

    useEffect(() => {
        if (user) {
            const userData = { ...user, birthday: formatDate(user.birthday) }
            reset(userData)
        } else {
            reset(defaultValues)
        }
    }, [user])

    const onSubmitForm = (dataForm) => {
        if (user) {
            onSubmit({ ...dataForm, id: user.id })
        } else {
            onSubmit(dataForm)
        }
        reset(defaultValues)
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className='form'>

            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    placeholder="First Name"
                    {...register('first_name')}
                />
                {errors.first_name && <p>{errors.first_name?.message}</p>}
            </div>

            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    placeholder="Last Name"
                    {...register('last_name')}
                />
                {errors.last_name && <p>{errors.last_name?.message}</p>}
            </div>

            <div className="form-floating mb-3">
                <input
                    type='email'
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email && <p>{errors.email?.message}</p>}
            </div>

            <div className="form-floating mb-3">
                <input
                    type='password'
                    className="form-control"
                    placeholder="Password"
                    {...register('password')}
                />
                {errors.password && <p>{errors.password?.message}</p>}
            </div>

            <div className="form-floating mb-3">
                <input
                    type='date'
                    className="form-control"
                    placeholder="Birthday"
                    {...register('birthday')}
                />
                {errors.birthday && <p>{errors.birthday?.message}</p>}
            </div>

            <div className="form-floating mb-3">
                <input
                    className="form-control"
                    placeholder="Image URL"
                    {...register('image_url')}
                />
                {errors.image_url && <p>{errors.image_url?.message}</p>}
            </div>

            <button type="submit" className={`btn ${user ? 'btn-warning' : 'btn-dark'}`}>
                {user ? 'Update' : 'Create'}
            </button>

            {user && (
                <button type='button' className='btn btn-light ms-2' onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    )
}
export default Form