import { useEffect, useState } from 'react'
import ghnApi from 'api/ghnApi'

function useWard(districtId) {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		if (districtId === null || districtId === undefined) {
			return setData([])
		}

		setLoading(true)
		let isMounted = true

		;(async () => {
			try {
				const response = await ghnApi.getWard(districtId)
				isMounted && setData(response.data)
			} catch (error) {
				console.log(error)
			} finally {
				isMounted && setLoading(false)
			}
		})()

		return () => {
			isMounted = false
		}
	}, [districtId])

	return { loading, data }
}

export default useWard
