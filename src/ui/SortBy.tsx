import { FC } from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom'

type OptionsType = {
	value: string
	label: string
}

type SortByType = {
	options: OptionsType[]
}

const SortBy: FC<SortByType> = ({ options }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const sortBy = searchParams.get('sortBy') || ''

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		searchParams.set('sortBy', e.target.value)

		setSearchParams(searchParams)
	}

	return (
		<Select
			options={options}
			value={sortBy}
			inputType='white'
			onChange={handleChange}
		/>
	)
}

export default SortBy
