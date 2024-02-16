import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import Spinner from '../../ui/Spinner'
import { useRecentStays } from './useRecentStays'
import Stats from './Stats'
import { useCabins } from '../cabins/useCabins'
import SalesChart from './SalesChart'
import DurationChart from './DurationChart'

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`

const DashboardLayout = () => {
	const { bookings, isPending } = useRecentBookings()
	const {
		stays,
		confirmedStays,
		isPending: isPendingStays,
		numDays,
	} = useRecentStays()
	const { cabins, isLoading } = useCabins()

	if (
		isPending ||
		isPendingStays ||
		isLoading ||
		!bookings ||
		!confirmedStays ||
		cabins === undefined
	) {
		return <Spinner />
	}

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<div>Today's activity</div>
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	)
}

export default DashboardLayout