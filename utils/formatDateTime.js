import moment from 'moment'

function formatDateTime(dateTime) {
	return moment(dateTime, 'YYYY-MM-DD HH:mm:ss', true).format(
		'DD-MM-YYYY HH:mm:ss'
	)
}

export default formatDateTime
