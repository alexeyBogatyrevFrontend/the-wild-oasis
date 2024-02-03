import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'
import toast from 'react-hot-toast'

export const useDeleteCabin = () => {
	const queryClient = useQueryClient()

	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: (id: number) => deleteCabinApi(id),
		onSuccess: () => {
			toast.success('Cabin successfuly deleted')

			queryClient.invalidateQueries({
				queryKey: ['cabins'],
			})
		},
		onError: err => toast.error(err.message),
	})

	return { isDeleting, deleteCabin }
}
