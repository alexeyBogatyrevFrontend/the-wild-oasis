import { CabinType } from '../../types'
import supabase, { supabaseUrl } from './supabase'

export const getCabins = async () => {
	const { data, error } = await supabase.from('cabins').select('*')

	if (error) {
		console.error(error)
		throw new Error('Cabins could not be loaded')
	}

	return data
}

export const createEditCabin = async (newCabin: CabinType, id?: number) => {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
	// @ts-expect-error something wrong
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '')
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

	// 1. Create/edit cabin
	let query = supabase.from('cabins')

	// A) CREATE
	// @ts-expect-error something wrong
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

	// B) EDIT
	if (id)
		// @ts-expect-error something wrong
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq('id', id)
			.select()

	const { data, error } = await query.select().single()

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be created')
	}

	// 2. Upload image
	if (hasImagePath) return data

	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image)

	// 3. Delete the cabin if there was an error uploading image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id)
		console.error(storageError)
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		)
	}

	return data
}

export const deleteCabin = async (id: number) => {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id)

	if (error) {
		console.error(error)
		throw new Error('Cabin could not be deleted')
	}

	return data
}
