import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './component/TopButtons';
import Inputs from './component/Inputs';
import TimeLocation from './component/TimeLocation';
import Temp_Detail from './component/Temp_Detail';
import Forecast from './component/Forecast';

import getFormattedWeatherData from './services/weatherServices';
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';


function App() {

  const [query, setQuery] = useState({ q: "delhi" })
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
      // console.log(data);
    };
    fetchWeather();
  }, [query, units]);

  // const fetchWeather = async() => {
  //   const data=await getFormattedWeatherData({q:"delhi"});
  //   console.log(data);
  // };
  // fetchWeather();
  const formatBackground = () => {
    if (!weather) return "mx-auto max-w-screen-md mt-4 py-5 px-32 bg-[url(https://images.unsplash.com/photo-1581150257735-1c93ea8306ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=800)]"
    const threshold = units === "metric" ? 35 : 40
    const threshold2 = units === "metric" ? 20 : 30
    if (weather.temp < threshold2) { return "mx-auto max-w-screen-md mt-4 py-5 px-32 bg-[url(https://images.unsplash.com/photo-1617558541906-6512230bb94f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)]" }

    else if (threshold > weather.temp) { return "mx-auto max-w-screen-md mt-4 py-5 px-32 bg-[url(https://images.unsplash.com/photo-1617478636464-7ea9804bbf58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=850&h=1000)]" }

    else { return "mx-auto max-w-screen-md mt-4 py-5 px-32 bg-[url(https://images.pexels.com/photos/4705087/pexels-photo-4705087.jpeg?auto=compress&cs=tinysrgb&w=1360&h=2000&dpr=1)] " }

  }

  // mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400
  return (
    
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-[url(https://images.pexels.com/photos/4705087/pexels-photo-4705087.jpeg?auto=compress&cs=tinysrgb&w=1360&h=2000&dpr=1)] 
     bg-no-repeat ${formatBackground()}`}
    >
      <img src="logo44.png" className="object-cover h-12 w-30 mx-auto" alt="" />
      <TopButtons setQuery={setQuery} />
      <br/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          
          <TimeLocation weather={weather} />
          <Temp_Detail weather={weather} />
          <Forecast title="hour forecaste" items={weather.hourly} />
          <Forecast title="daily forecaste" items={weather.daily} />
        </div>

      )}
      {/* <TimeLocation/>
      <Temp_Detail/>
      <Forecast title="hour forecaste" />
      <Forecast title="daily forecaste" /> */}
      

    </div>
  );
}

export default App;   
