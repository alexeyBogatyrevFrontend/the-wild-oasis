import { FC } from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select<{ inputType: string }>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${props =>
			props.inputType === 'white'
				? 'var(--color-grey-100)'
				: 'var(--color-grey-300)'};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`

type OptionsType = {
	value: string
	label: string
}

type SelectProps = {
	options: OptionsType[]
	value: string
	inputType: string
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = ({ options, value, onChange, inputType }) => {
	return (
		<StyledSelect value={value} onChange={onChange} inputType={inputType}>
			{options.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	)
}

export default Select
