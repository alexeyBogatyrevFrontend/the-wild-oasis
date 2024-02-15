import { FC, ReactNode, createContext, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

type DarkModeProviderType = {
	children: ReactNode
}

const DarkModeContext = createContext<{
	isDarkMode: boolean
	toggleDarkMode: () => void
}>({
	isDarkMode: false,
	toggleDarkMode: () => {},
})

const DarkModeProvider: FC<DarkModeProviderType> = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode')

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark-mode')
			document.documentElement.classList.remove('light-mode')
		} else {
			document.documentElement.classList.add('light-mode')
			document.documentElement.classList.remove('dark-mode')
		}
	}, [isDarkMode])

	const toggleDarkMode = () => {
		setIsDarkMode((prev: boolean) => !prev)
	}

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	)
}

const useDarkMode = () => {
	const context = useContext(DarkModeContext)

	if (context === undefined)
		throw new Error('DarkModeContext was used outside of DarkModeProvider')
	return context
}

export { DarkModeProvider, useDarkMode }
