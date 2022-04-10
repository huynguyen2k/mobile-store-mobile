import { useCallback, useEffect, useState } from 'react'

function useFetchData(callback) {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const [fetchStatus, setFetchStatus] = useState(true)

	const refetchData = useCallback(() => {
		setFetchStatus(true)
	}, [])

	useEffect(() => {
		if (!fetchStatus) return

		setLoading(true)
		let isMounted = true

		;(async () => {
			try {
				const response = await callback()
				isMounted && setData(response.content)
			} catch (error) {
				console.log(error)
			} finally {
				if (isMounted) {
					setLoading(false)
					setFetchStatus(false)
				}
			}
		})()

		return () => {
			isMounted = false
		}
	}, [callback, fetchStatus])

	return { loading, data, refetchData }
}

export default useFetchData
