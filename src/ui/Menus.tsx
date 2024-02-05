import {
	FC,
	ReactNode,
	createContext,
	useContext,
	useState,
	MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { HiEllipsisVertical } from 'react-icons/hi2'
import styled from 'styled-components'
import useOutsideClick from '../hooks/useOutsideClick'

const Menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
	position: fixed;
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${props => props.position.x}px;
	top: ${props => props.position.y}px;
`

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`

type MenusType = {
	children: ReactNode
}

type MenusContextType = {
	openId: string
	close: () => void
	open: (id: string) => void
	position: { x: number; y: number } | null
	setPosition: (position: { x: number; y: number }) => void
}

const MenusContext = createContext<MenusContextType>({
	openId: '',
	close: () => {},
	open: () => {},
	position: null,
	setPosition: () => {},
})

const Menus: FC<MenusType> & {
	Menu: FC
	Toggle: FC<{ id: string }>
	List: FC<{ id: string }>
	Button: FC<{ icon: ReactNode; onClick?: () => void }>
} = ({ children }) => {
	const [openId, setOpenId] = useState('')
	const [position, setPosition] = useState<{ x: number; y: number } | null>(
		null
	)

	const close = () => setOpenId('')
	const open = (id: string) => setOpenId(id)

	return (
		<MenusContext.Provider
			value={{ openId, close, open, position, setPosition }}
		>
			{children}
		</MenusContext.Provider>
	)
}

const Toggle: FC<{ id: string }> = ({ id }) => {
	const { openId, close, open, setPosition } = useContext(MenusContext)

	const handleClick = (e: MouseEvent) => {
		const rect = e.currentTarget.getBoundingClientRect()
		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		})

		openId === '' || openId !== id ? open(id) : close()
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	)
}

const List: FC<{ id: string }> = ({ id, children }) => {
	const { openId, position, close } = useContext(MenusContext)

	const ref = useOutsideClick(close)

	if (openId !== id) return null

	return createPortal(
		<StyledList ref={ref} position={position!}>
			{children}
		</StyledList>,
		document.body
	)
}

const Button: FC<{ icon: ReactNode; onClick?: () => void }> = ({
	children,
	icon,
	onClick,
}) => {
	const { close } = useContext(MenusContext)

	const handleClick = () => {
		onClick?.()
		close()
	}

	return (
		<li>
			<StyledButton onClick={handleClick}>
				{icon} <span>{children}</span>
			</StyledButton>
		</li>
	)
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
