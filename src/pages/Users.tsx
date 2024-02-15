import styled from 'styled-components'
import SignupForm from '../features/authentication/SignupForm'
import Heading from '../ui/Heading'

const StyledInfo = styled.h3`
	text-align: center;
	font-weight: 500;
	font-size: 1.4rem;
	color: var(--color-grey-600);
`

function NewUsers() {
	return (
		<>
			<Heading as='h1'>Create a new user</Heading>
			<StyledInfo>
				if you create a new user, enter a valid email, a confirmation link will
				be sent to it
			</StyledInfo>
			<SignupForm />
		</>
	)
}

export default NewUsers
