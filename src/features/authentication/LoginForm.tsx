import { FormEvent, useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import FormRowVertical from '../../ui/FormRowVertical'
import { useLogin } from './useLogin'
import SpinnerMini from '../../ui/SpinnerMini'

function LoginForm() {
	const [email, setEmail] = useState('bogatyrev@example.com')
	const [password, setPassword] = useState('password')

	const { login, isLogging } = useLogin()

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!email || !password) return
		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail('')
					setPassword('')
				},
			}
		)
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label='Email address'>
				<Input
					type='email'
					id='email'
					autoComplete='username'
					value={email}
					onChange={e => setEmail(e.target.value)}
					disabled={isLogging}
				/>
			</FormRowVertical>
			<FormRowVertical label='Password'>
				<Input
					type='password'
					id='password'
					autoComplete='current-password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					disabled={isLogging}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size='large' disabled={isLogging}>
					{isLogging ? <SpinnerMini /> : 'Login'}
				</Button>
			</FormRowVertical>
		</Form>
	)
}

export default LoginForm
