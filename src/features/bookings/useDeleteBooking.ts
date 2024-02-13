import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'
import toast from 'react-hot-toast'

export const useDeleteBooking = () => {
	const queryClient = useQueryClient()

	const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: (id: number) => deleteBookingApi(id),
		onSuccess: () => {
			toast.success(`Booking successfuly deleted`)
			queryClient.invalidateQueries({
				queryKey: ['bookings'],
			})
		},
		onError: err => toast.error(err.message),
	})

	return { isDeleting, deleteBooking }
}
