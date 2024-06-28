import {DateTime} from "luxon";

const API_KEY = "0a7c0f4db5f94c69260f7c263bc6266e"
const BASE_URL = "https://api.openweathermap.org/data/2.5/"
const getWeatherdata = (infoType, searchParams) => {
    const url = new URL(BASE_URL  + infoType);
    url.search = new URLSearchParams({...searchParams, appid: API_KEY})

    return fetch(url).then((res) => res.json()).then((data) => data)
}


const iconUrl = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`


const formatTLT = (
sec,
offset,
format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(sec + offset, {zone: "utc"}).toFormat(format);





const formatcurrent = (data) => {
    const {
    coord: {lat, lon},
main: {temp,feels_like,temp_min,temp_max, humidity},
name,
dt,
sys:{ country, sunrise,sunset},
 weather,
  wind:{speed},
  timezone
  } = data


const {main: details, icon} = weather[0]
const formattedTLT = formatTLT(dt,timezone);

return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise: formatTLT(sunrise, timezone, 'hh:mm a'),
    sunset: formatTLT(sunset, timezone, 'hh:mm a'),details,icon: iconUrl(icon),formattedTLT,speed,dt,timezone,lat,lon}
}
const formatforecast = (sec, offset, data) => {
    const hourly = data.map((f) => ({
        temp: f.main.temp,
        title: formatTLT(f.dt, offset, "hh:mm a"),
        icon:iconUrl(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0, 7);

    const daily = data.filter((f)=> f.dt_txt.slice(-8) === "00:00:00").map((f) => ({
        temp: f.main.temp,
        title: formatTLT(f.dt, offset, "ccc"),
        icon:iconUrl(f.weather[0].icon),
        date: f.dt_txt,
    }))

    return {hourly,daily}
}
//     let {timezone,daily,hourly} = data;
//      daily = daily.slice(1,6).map( d => {
//         return{
//             title: localtime(d.dt,timezone, 'ccc'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon
//         }
//     })
//     hourly = hourly.slice(1,6).map( h => {
//         return{
//             title: localtime(h.dt,timezone, 'hh:mm a'),
//             temp: h.temp,
//             icon: h.weather[0].icon
//         }
//     })


// return {timezone, daily, hourly};
// }


const formatwData = async (searchParams) => {
 const formattedcurrent = await getWeatherdata('weather', searchParams).then(formatcurrent)
 const {dt,lat,lon,timezone} = formattedcurrent

 const forecastWeather = await getWeatherdata("forecast", {
    lat,
    lon,
    exclude: "current, minutely,alerts",
    units: searchParams.units,
 }).then((d) => formatforecast(dt,timezone,d.list));


 return {...formattedcurrent,...forecastWeather};
}

const localtime = (s, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(s).setZone(zone).toFormat(format);
export default formatwData