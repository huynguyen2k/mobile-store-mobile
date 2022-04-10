import moment from 'moment'
import 'moment/locale/vi'

function getTimeFromNow(dateTime) {
	const momentDateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss', true)
	momentDateTime.locale('vi')

	return momentDateTime.fromNow()
}

export default getTimeFromNow
