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

export type SeetingsType = {
	id: number
	created_at: string
	minBookingLength: number
	maxBookingLength: number
	maxGuestsPerBooking: number
	breakfastPrice: number
}
