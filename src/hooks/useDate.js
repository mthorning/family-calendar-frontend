import { useState } from 'react'
import moment from 'moment'

export default function(initial) {
    const [date, set] = useState(initial)
    return {
        setDate(newDate) {
            if (!newDate) {
                set(null)
            } else {
                set(new moment(newDate))
            }
        },
        getDateStr(format) {
            if (!date) return ''
            return date.format(format)
        },
        isDate: date ? true : false,
        getMoment() {
            return date
        },
    }
}
