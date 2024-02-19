import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import CreateCabinForm from './CreateCabinForm'

const AddCabin = () => {
	return (
		<div>
			{/* @ts-expect-error skip it */}
			<Modal>
				<Modal.Open opens='cabin-form' name='cabin-form'>
					<Button>Add new cabin</Button>
				</Modal.Open>
				<Modal.Window opens='cabin-form' name='cabin-form'>
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	)
}

export default AddCabin
