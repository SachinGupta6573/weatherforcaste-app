import React from 'react'
import { formatToLocalTime } from '../services/weatherServices'

function TimeLocation( {weather:{dt,timezone,name,country}}) {
  return (
    <div>
    <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight mx-1">
            {/* Mondey, 31 jul 2023 | Local time: 11:24 pm */}
            {formatToLocalTime(dt,timezone)}

        </p>
    </div>
    <div className="flex items-center justify-center my-3">
    <p className="text-white text-3xl font-extralight mx-1">
        {/* Delhi, Bharat */}
        {`${name},${country}`}

    </p>
     </div>
</div>
    
  )
}

export default TimeLocation