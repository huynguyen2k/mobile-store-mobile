import { useEffect, useState } from 'react'
import ghnApi from 'api/ghnApi'

function useDistrict(provinceId) {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		if (provinceId === null || provinceId === undefined) {
			return setData([])
		}

		setLoading(true)
		let isMounted = true

		;(async () => {
			try {
				const response = await ghnApi.getDistrict(provinceId)
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
	}, [provinceId])

	return { loading, data }
}

export default useDistrict
