import { useState, useEffect } from "react";
import { getTime } from '../features/functions';

const Clock = () => {
    const [time, setTime] = useState(getTime);

    useEffect(() => {
        const interval = setInterval(() => setTime(getTime()), 1000);
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className='clock'>
            {time}
        </div>
    )
}

export default Clock;