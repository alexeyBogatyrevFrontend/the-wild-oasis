import styled from 'styled-components'
import { format, isToday } from 'date-fns'

import Tag from '../../ui/Tag'
import Table from '../../ui/Table'

import { formatCurrency } from '../../utils/helpers'
import { formatDistanceFromNow } from '../../utils/helpers'
import { FC } from 'react'
import { BookingType } from '../../../types'
import Menus from '../../ui/Menus'
import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiEye,
	HiTrash,
} from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useCheckout } from '../check-in-out/useCheckout'
import { useDeleteBooking } from './useDeleteBooking'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`

type BookingRowType = {
	booking: BookingType
}

const BookingRow: FC<BookingRowType> = ({
	booking: {
		id: bookingId,
		startDate,
		endDate,
		numNights,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}) => {
	const navigate = useNavigate()

	const { checkout, isCheckingOut } = useCheckout()
	const { deleteBooking, isDeleting } = useDeleteBooking()

	const statusToTagName: Record<string, string> = {
		unconfirmed: 'blue',
		'checked-in': 'green',
		'checked-out': 'silver',
	}

	// Use type assertion to tell TypeScript that status will be one of the keys of statusToTagName
	const tagType = statusToTagName[status as keyof typeof statusToTagName] || ''

	return (
		// @ts-expect-error something wrong
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? 'Today'
						: // @ts-expect-error skip it
						  formatDistanceFromNow(startDate)}{' '}
					&rarr; {numNights} night stay
				</span>
				<span>
					{format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
					{format(new Date(endDate), 'MMM dd yyyy')}
				</span>
			</Stacked>

			<Tag type={tagType}>{status.replace('-', ' ')}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			{/* @ts-expect-error skip it */}
			<Modal>
				{/* @ts-expect-error skip it */}
				<Menus.Menu>
					{/* @ts-expect-error skip it */}
					<Menus.Toggle id={bookingId} />
					{/* @ts-expect-error skip it */}
					<Menus.List id={bookingId}>
						{/* @ts-expect-error skip it */}
						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/bookings/${bookingId}`)}
						>
							See details
						</Menus.Button>

						{status === 'unconfirmed' && (
							<>
								{/* @ts-expect-error skip it */}
								<Menus.Button
									icon={<HiArrowDownOnSquare />}
									onClick={() => navigate(`/checkin/${bookingId}`)}
								>
									Check in
								</Menus.Button>
							</>
						)}

						{status === 'checked-in' && (
							<>
								{/* @ts-expect-error skip it */}
								<Menus.Button
									icon={<HiArrowUpOnSquare />}
									onClick={() => checkout(bookingId)}
									disabled={isCheckingOut}
								>
									Check out
								</Menus.Button>
							</>
						)}

						<Modal.Open opens='delete' name='delete'>
							{/* @ts-expect-error skip it */}
							<Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
						</Modal.Open>
					</Menus.List>
				</Menus.Menu>

				<Modal.Window opens='delete' name='delete'>
					<ConfirmDelete
						resourceName='booking'
						onConfirm={() => deleteBooking(bookingId)}
						disabled={isDeleting}
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	)
}

export default BookingRow
