import { FC } from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom'

type optionsType = {
	value: string
	label: string
}

type SortByType = {
	options: optionsType[]
}

const SortBy: FC<SortByType> = ({ options }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const sortBy = searchParams.get('sortBy') || ''

	const handleChange = e => {
		searchParams.set('sortBy', e.target.value)

		setSearchParams(searchParams)
	}

	return (
		<Select
			options={options}
			value={sortBy}
			type='white'
			onChange={handleChange}
		/>
	)
}

export default SortBy
