import { useEffect, useState } from 'react'
import ghnApi from 'api/ghnApi'

function useProvince() {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		setLoading(true)
		let isMounted = true

		;(async () => {
			try {
				const response = await ghnApi.getProvince()
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
	}, [])

	return { loading, data }
}

export default useProvince
