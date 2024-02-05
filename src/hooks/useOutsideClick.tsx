import { useEffect, useRef } from 'react'

const useOutsideClick = (handler: () => void, listenCapturing = true) => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClick = (e: any) => {
			if (ref.current && !ref.current.contains(e.target as Node)) handler()
		}

		document.addEventListener('click', handleClick, listenCapturing)

		return () =>
			document.removeEventListener('click', handleClick, listenCapturing)
	}, [handler, listenCapturing])

	return ref
}

export default useOutsideClick