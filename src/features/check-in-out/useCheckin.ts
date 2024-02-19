import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface BookingData {
	bookingId: number
	breakfast: {
		hasBreakfast: boolean
		extrasPrice: number
		totalPrice: number
	}
}

export const useCheckin = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const { mutate: checkin, isPending: isCheckingIn } = useMutation<
		BookingData,
		any,
		BookingData
	>({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: 'checked-in',
				isPaid: true,
				...breakfast,
			}),
		onSuccess: data => {
			// @ts-expect-error skip it
			toast.success(`Booking #${data.id} successfully checked in`)
			// @ts-expect-error skip it
			queryClient.invalidateQueries({ active: true })
			navigate('/')
		},
		onError: () => toast.error('There was an error while checking in'),
	})

	return { checkin, isCheckingIn }
}
