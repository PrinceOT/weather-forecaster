import React, { useState } from 'react'
import {UilSearch, UilLocationPoint} from "@iconscout/react-unicons"

function Input({setQuery, setunits}) {
  const [city,setCity] = useState('');

  const handleclick = () =>{
    if(city !== "") setQuery({q: city})
  }

  const handlelocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {

     const {latitude ,longitude} = position.coords
      setQuery({lat:latitude, lon:longitude})    
      })
    }
  };
  return (
    <div className='flex flex-row justify-center my-6'> <div className='flex flex-row w-3/4 items-center justify-center space-x-4'> 
    <input 
    value={city}
    onChange={(e) => setCity(e.currentTarget.value)}
    type='text' placeholder='search for city' className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:capitalize'/>
    <UilSearch size={25} className="text-white cursor-pointer transition ease-out hover:scale-125" onClick={handleclick}/>
    <UilLocationPoint size={25} className="text-white cursor-pointer transition ease-out hover:scale-125 " onClick={handlelocation}/>
    </div>

    <div className='flex flex-row w-1/4 items-center justify-center'>
    <button name='metric' className='text-xl text-white font-light' onClick={()=> setunits("metric")}>°C</button>
    <p className='text-xl text-white mx-1'>|</p>
    <button name='imperial' className='text-xl text-white font-light' onClick={()=> setunits("imperial")}>°F</button>


    </div>
    </div>
  )
}

export default Input