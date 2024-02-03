import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CabinType } from '../../../types'
import { createEditCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export const useEditCabin = () => {
	const queryClient = useQueryClient()

	const { mutate: editCabin, isPending: isEditing } = useMutation<
		CabinType,
		Error,
		{ newCabinData: CabinType; id: number }
	>({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success('Cabin successfully edited')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			// reset()
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	return { editCabin, isEditing }
}
