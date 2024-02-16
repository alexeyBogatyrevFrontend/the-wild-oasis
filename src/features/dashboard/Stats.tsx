import { FC } from 'react'
import { BookingType } from '../../../types'
import Stat from './Stat'
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'

type StatsType = {
	bookings: BookingType[]
	confirmedStays: BookingType[]
	numDays: number
	cabinCount: number
}

const Stats: FC<StatsType> = ({
	bookings,
	confirmedStays,
	numDays,
	cabinCount,
}) => {
	// 1.
	const numBookings = bookings.length

	// 2.
	const sales = bookings.reduce((accum, cur) => accum + cur.totalPrice, 0)

	// 3.
	const checkins = confirmedStays.length

	// 4.
	const occupation =
		confirmedStays.reduce((accum, cur) => accum + cur.numNights, 0) /
		(numDays * cabinCount)

	return (
		<>
			<Stat
				title='Bookings'
				color='blue'
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title='Sales'
				color='green'
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title='Check ins'
				color='indigo'
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title='Occupancy rate'
				color='yellow'
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + '%'}
			/>
		</>
	)
}

export default Stats