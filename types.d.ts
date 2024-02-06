export type CabinType = {
	id?: number
	created_at?: string
	name: string
	maxCapacity: number
	regularPrice: number
	discount: number
	description: string
	image: string
}

export type SettingsType = {
	id: number
	created_at: string
	minBookingLength: number
	maxBookingLength: number
	maxGuestsPerBooking: number
	breakfastPrice: number
}

export type BookingType = {
	id: number
	created_at: Date
	startDate: Date
	endDate: Date
	numNights: number
	numGuests: number
	cabinPrice: number
	extrasPrice: number
	totalPrice: number
	status: string
	hasBreakfast: boolean
	isPaid: boolean
	observations?: string
	cabinId: number
	guestId: number
	cabins: CabinType
	guests: GuestType
}

export type GuestType = {
	id: number
	created_at: string
	fullName: string
	email: string
	country: string
	nationalID: string
	nationality: string
	countryFlag: string
}
