import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin } from '../../services/apiCabins'
import toast from 'react-hot-toast'
import { CabinType } from '../../../types'
import FormRow from '../../ui/FormRow'
import { FC } from 'react'

type CreateCabinFormType = {
	cabinToEdit?: CabinType
}

const CreateCabinForm: FC<CreateCabinFormType> = ({ cabinToEdit }) => {
	const { id: editId, ...editValues } = cabinToEdit || {}

	const isEditSession = Boolean(editId)

	const { register, handleSubmit, reset, getValues, formState } =
		useForm<CabinType>({
			defaultValues: isEditSession ? editValues : {},
		})

	const { errors } = formState

	const queryClient = useQueryClient()

	const { mutate: createCabin, isPending: isCreating } = useMutation<
		CabinType,
		Error,
		{ newCabin: CabinType }
	>({
		mutationFn: ({ newCabin }) => createEditCabin(newCabin),
		onSuccess: () => {
			toast.success('New cabin successfully created')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			reset()
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	const { mutate: editCabin, isPending: isEditing } = useMutation<
		CabinType,
		Error,
		{ newCabinData: CabinType; id: number }
	>({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success('Cabin successfully edited')
			queryClient.invalidateQueries({ queryKey: ['cabins'] })
			reset()
		},
		onError: err => {
			toast.error(err.message)
		},
	})

	const isWorking = isCreating || isEditing

	const onSubmit: SubmitHandler<CabinType> = (data: CabinType) => {
		const image = typeof data.image === 'string' ? data.image : data.image[0]

		if (isEditSession) {
			if (editId !== undefined) {
				editCabin({ newCabinData: { ...data, image }, id: editId })
			} else {
				// Handle the case where editId is undefined
				console.error('editId is undefined')
			}
		} else {
			createCabin({ newCabin: { ...data, image: image } })
		}
	}

	const onError = (errors: any) => {
		console.log(errors)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Regular price' error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Price should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: value =>
							value <= getValues().regularPrice ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={errors?.description?.message}
			>
				<Textarea
					id='description'
					defaultValue=''
					disabled={isWorking}
					{...register('description', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Cabin photo' error={errors?.image?.message}>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isEditSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variant='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateCabinForm
