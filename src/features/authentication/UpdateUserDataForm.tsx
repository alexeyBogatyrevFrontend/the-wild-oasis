import { FormEvent, useState } from 'react'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUser } from './useUser'
import { useUpdateUser } from './useUpdateUser'

function UpdateUserDataForm() {
	const { user } = useUser()
	const email = user?.email
	const currentFullName = user?.user_metadata?.fullName

	const { updateUser, isUpdating } = useUpdateUser()

	const [fullName, setFullName] = useState(currentFullName)
	const [avatar, setAvatar] = useState<File | null>(null)

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		if (!fullName) return

		updateUser(
			// @ts-expect-error something wrong
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(null)
					const form = e.target as HTMLFormElement
					form.reset()
				},
			}
		)
	}

	const handleCancel = () => {
		setFullName(currentFullName)
		setAvatar(null)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label='Email address'>
				<Input value={email} disabled />
			</FormRow>
			<FormRow label='Full name'>
				<Input
					type='text'
					value={fullName}
					onChange={e => setFullName(e.target.value)}
					id='fullName'
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label='Avatar image'>
				<FileInput
					id='avatar'
					accept='image/*'
					onChange={e => setAvatar(e.target.files ? e.target.files[0] : null)}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow>
				<Button
					type='reset'
					variant='secondary'
					disabled={isUpdating}
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button disabled={isUpdating}>Update account</Button>
			</FormRow>
		</Form>
	)
}

export default UpdateUserDataForm
