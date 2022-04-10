import { useEffect, useState } from 'react'
import sleep from 'utils/sleep'

function useLoading() {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let isMounted = true

		;(async () => {
			await sleep(1000)
			if (isMounted) setLoading(false)
		})()

		return () => {
			isMounted = false
		}
	}, [])

	return loading
}

export default useLoading
