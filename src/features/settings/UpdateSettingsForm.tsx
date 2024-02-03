import { ChangeEvent } from 'react'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSetting'

function UpdateSettingsForm() {
	const { isLoading, settings } = useSettings()
	const { updateSetting, isUpdating } = useUpdateSetting()

	const handleUpdate = (e: ChangeEvent<HTMLInputElement>, field: string) => {
		const { value } = e.target

		if (!value) return
		updateSetting({ [field]: value })
	}

	if (isLoading) return <Spinner />

	return (
		<Form>
			<FormRow label='Minimum nights/booking'>
				<Input
					type='number'
					id='min-nights'
					defaultValue={settings?.minBookingLength}
					disabled={isUpdating}
					onBlur={e => handleUpdate(e, 'minBookingLength')}
				/>
			</FormRow>
			<FormRow label='Maximum nights/booking'>
				<Input
					type='number'
					id='max-nights'
					defaultValue={settings?.maxBookingLength}
					disabled={isUpdating}
					onBlur={e => handleUpdate(e, 'maxBookingLength')}
				/>
			</FormRow>
			<FormRow label='Maximum guests/booking'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={settings?.maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</FormRow>
			<FormRow label='Breakfast price'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={settings?.breakfastPrice}
					disabled={isUpdating}
					onBlur={e => handleUpdate(e, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	)
}

export default UpdateSettingsForm
