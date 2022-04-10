import receiptApi from 'api/warehouseApi'
import { useCallback, useEffect, useState } from 'react'

function useReceiptDetail(id) {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState(null)
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
				const response = await receiptApi.get(id)
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

export default useReceiptDetail
