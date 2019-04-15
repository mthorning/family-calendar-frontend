import { useState, useMemo } from 'react'
import moment from 'moment'

export default function(format = 'DD/MM/YYYY') {
    const [date, setDate] = useState(null)
    const dateStr = useMemo(
        () => (date === null ? null : moment(date).format(format)),
        [date]
    )
    return { dateStr, setDate, date }
}
