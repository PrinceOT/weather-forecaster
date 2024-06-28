import React from 'react'

function TopButtons({setQuery}) {

  
    const cities = [ {id:1,title:'London'},{id:2,title:'Paris'},{id:3,title:'Lagos'},{id:4,title:'Washinton DC'},{id:5,title:'Birmingham'},]

  return (<div className='flex items-center justify-around my-6'>
        {cities.map((city) => (
            <button key={city.id} className='text-white text-lg font-medium hover:bg-gray-700/20 px-3 rounded-md transition ease-in' onClick={()=> setQuery({q : city.title})}>{city.title}</button>
        ))}
    </div>)
  
}

export default TopButtons;