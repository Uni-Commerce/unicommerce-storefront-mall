import { useEffect, useState, useRef } from 'react'
import dayjs from 'dayjs'

const TimeComponent: React.FC = () => {
  const [timer, setTimer] = useState<Date>(new Date())
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return <span>{dayjs(timer).format('YYYY-MM-DD HH:mm:ss')}</span>
}

export default TimeComponent
