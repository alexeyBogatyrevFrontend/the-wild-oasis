import { FC } from 'react'
import Button from '../../ui/Button'
import { useCheckout } from './useCheckout'

type CheckoutButtonType = {
	bookingId: number
}

const CheckoutButton: FC<CheckoutButtonType> = ({ bookingId }) => {
	const { checkout, isCheckingOut } = useCheckout()

	return (
		<Button
			variant='primary'
			size='small'
			onClick={() => checkout(bookingId)}
			disabled={isCheckingOut}
		>
			Check out
		</Button>
	)
}

export default CheckoutButton
