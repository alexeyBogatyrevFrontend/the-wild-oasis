import { useMutation } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const useLogin = () => {
	const navigate = useNavigate()

	const { mutate: login, isPending: isLogging } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: () => {
			navigate('/dashboard')
		},
		onError: err => {
			console.log('ERROR', err)
			toast.error('Provided email or password are incorrect')
		},
	})

	return { login, isLogging }
}
