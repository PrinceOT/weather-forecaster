import { useEffect, useState } from 'react';
import './App.css';
import UilReact from "@iconscout/react-unicons/icons/uil-react"
import TopButtons from './componets/TopButtons';
import Input from './componets/Input';
import TandL from './componets/TandL';
import Actualweather from './componets/Actualweather';
import Forecasts from './componets/Forecasts';
import formatwData from './service/weatherService';

function App() {

  const [query,setQuery] = useState({q: 'london'})
  const [units, setunits] = useState('metric')
  const [weather, setweather] = useState(null)



  const fetchw = async () => {
    const data = await formatwData({...query, units}).then( data =>
      {setweather(data);

      }
    );
    console.log(weather);
  }
  useEffect(() => {
  
   fetchw();
    
  }, [query,units])
  

 
  
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
   <TopButtons setQuery={setQuery}/>
   <Input setQuery={setQuery} setunits={setunits}/>
   { weather && (
    <>
    <TandL weather={weather}/>
   <Actualweather weather={weather}/>
   <Forecasts title="hourly forecast" data={weather.hourly}/>
   <Forecasts title="Daily forecast" data={weather.daily}/>
   </>
   )

   }
   
    </div>
  );
}

export default App;
