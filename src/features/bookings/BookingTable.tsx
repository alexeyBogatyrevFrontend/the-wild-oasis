import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Empty from '../../ui/Empty'
import { useBookings } from './useBookings'
import Spinner from '../../ui/Spinner'
import Pagination from '../../ui/Pagination'

const BookingTable = () => {
	const { isLoading, bookings, count } = useBookings()

	if (isLoading) return <Spinner />
	if (bookings) if (!bookings.length) return <Empty resource='bookings' />

	return (
		<Menus>
			<Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
				{/* @ts-expect-error skip it */}
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={bookings ? bookings : []}
					render={booking => (
						<BookingRow key={booking.id} booking={booking as any} />
					)}
				/>

				{/* @ts-expect-error skip it */}
				<Table.Footer>
					<Pagination count={count ? count : 0} />
				</Table.Footer>
			</Table>
		</Menus>
	)
}

export default BookingTable
