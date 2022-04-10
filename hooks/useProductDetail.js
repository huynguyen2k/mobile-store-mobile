import productApi from 'api/productApi'
import { useCallback, useEffect, useState } from 'react'

function useProductDetail(id) {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
	const [fetchStatus, setFetchStatus] = useState(false)

	const refetchData = useCallback(() => {
		setFetchStatus(true)
	}, [])

	useEffect(() => {
		refetchData()
	}, [id, refetchData])

	useEffect(() => {
		if (!fetchStatus) return

		setLoading(true)
		let isMounted = true

		;(async () => {
			try {
				const response = await productApi.get(id)
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
	}, [id, fetchStatus])

	return { loading, data, refetchData }
}

export default useProductDetail
