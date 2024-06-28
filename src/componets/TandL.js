import React from 'react'

function TandL({weather}) {
  return (
    <div><div className='flex items-center justify-center my-6'> 
    
    <p className='text-white text-xl font-extralight'>{weather.formattedTLT}</p>
   
    </div>
     <div className='flex items-center justify-center my-3'>
     <p className='text-white text-xl font-medium'>{weather.name}, {weather.country}</p>
     </div>
    </div>
  )
}

export default TandL