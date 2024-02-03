import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CabinType } from '../../../types'
import { createEditCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export const useCreateCabin = () => {
	const queryClient = useQueryClient()

	const { mutate: createCabin, isPending: isCreating } = useMutation<
		CabinType,
		Error,
		{ newCabin: CabinType }
	>({
		mutationFn: ({ newCabin }) => createEditCabin(newCabin),
		onSuccess: () => {
			toast.success('New cabin successfully created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			// reset()
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return { createCabin, isCreating }
}
