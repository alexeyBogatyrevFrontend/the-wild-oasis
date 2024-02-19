import { FC } from 'react'
import styled from 'styled-components'
import { CabinType } from '../../../types.d'
import { formatCurrency } from '../../utils/helpers'
import CreateCabinForm from './CreateCabinForm'
import { useDeleteCabin } from './useDeleteCabin'
import { HiSquare2Stack } from 'react-icons/hi2'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { useCreateCabin } from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`

type CabinRowType = {
	cabin: CabinType
}

const CabinRow: FC<CabinRowType> = ({ cabin }) => {
	const {
		id: cabinId,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin

	const { isDeleting, deleteCabin } = useDeleteCabin()
	const { createCabin } = useCreateCabin()

	const handleDuplicate = () => {
		createCabin({
			newCabin: {
				name: `Copy of ${name}`,
				maxCapacity,
				regularPrice,
				discount,
				image,
				description,
			},
		})
	}

	return (
		<>
			{/* @ts-expect-error skip it */}
			<Table.Row role='row'>
				<Img src={image} />
				<Cabin>{name}</Cabin>
				<div>Fits up to {maxCapacity} guests</div>
				<Price>{formatCurrency(regularPrice)}</Price>
				{discount ? (
					<Discount>{formatCurrency(discount)}</Discount>
				) : (
					<span>&mdash;</span>
				)}
				<div>
					{/* @ts-expect-error skip it */}
					<Modal>
						{/* @ts-expect-error skip it */}
						<Menus.Menu>
							{/* @ts-expect-error skip it */}
							<Menus.Toggle id={cabinId} />
							{/* @ts-expect-error skip it */}
							<Menus.List id={cabinId}>
								{/* @ts-expect-error skip it */}
								<Menus.Button
									icon={<HiSquare2Stack />}
									onClick={handleDuplicate}
								>
									Duplicate
								</Menus.Button>

								<Modal.Open opens='edit' name='edit'>
									{/* @ts-expect-error skip it */}
									<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
								</Modal.Open>

								<Modal.Open opens='delete' name='delete'>
									{/* @ts-expect-error skip it */}
									<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
								</Modal.Open>
							</Menus.List>
						</Menus.Menu>

						<Modal.Window opens='edit' name='edit'>
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>

						<Modal.Window opens='edit' name='delete'>
							<ConfirmDelete
								resourceName='cabin'
								disabled={isDeleting}
								onConfirm={() => deleteCabin(cabinId ? cabinId : 0)}
							/>
						</Modal.Window>
					</Modal>
				</div>
			</Table.Row>
		</>
	)
}

export default CabinRow
