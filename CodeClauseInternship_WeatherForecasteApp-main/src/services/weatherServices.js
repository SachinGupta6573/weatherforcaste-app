// import { DateTime } from "luxon";
// const API_KEY = "64899b97d4d413020b7b2fccf4461e4a";
// const BASE_URL = "https://api.openweathermap.org/data/2.5"



// const getWeatherData = (infoType, searchParams) => {
//     const url = new URL(BASE_URL + "/" + infoType);
//     url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
//     // console.log(url);
//     return fetch(url).then((res) => res.json());
// };
// // export default getWeatherData
// const formatedCurrentWeather = (data) => {
//     const {
//         coord: { lat, lon },
//         main: { temp, feel_like, temp_min, temp_max, humidity },
//         name,
//         dt,
//         sys: { country, sunrise, sunset },
//         weather,
//         wind: { speed }
//     } = data
//     const { main: details, icon } = weather[0]
//     return { lat, lon, temp, feel_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed };
// };
// // const formatForecastWeather = (data) => {
// //     let { timezone, daily, hourly } = data;
// //     daily = daily.slice(1, 6).map((d) => {
// //         return {
// //             title: formatToLocalTime(d.dt, timezone, "ccc"),
// //             temp: d.temp.day,
// //             icon: d.weather[0].icon,
// //         };
// //     });

// //     hourly = hourly.slice(1, 6).map((d) => {
// //         return {
// //             title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
// //             temp: d.temp,
// //             icon: d.weather[0].icon,
// //         };
// //     });

// //     return { timezone, daily, hourly };
// // };
// const formatForecastWeather = (data) => {
//     let { city, list } = data;
//     const timezone = data.city.timezone;
  
//     // Extract daily forecast data
//     const daily = list
//       .filter((d, index) => index % 8 === 0) // Get data every 24 hours (index divisible by 8)
//       .slice(0, 5) // Take the next 5 days
//       .map((d) => {
//         return {
//           title: formatToLocalTime(d.dt, timezone, "ccc"),
//           temp: d.main.temp,
//           icon: d.weather[0].icon,
//         };
//       });
  
//     // Extract hourly forecast data
//     const hourly = list
//       .slice(0, 5 ) // Take the next 5 days of hourly data (8 data points per day)
//       .map((d) => {
//         return {
//           title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
//           temp: d.main.temp,
//           icon: d.weather[0].icon,
//         };
//       });
  
//     return { timezone, daily, hourly };
//   }


// const getFormattedWeatherData = async (searchParams) => {
//     const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatedCurrentWeather);
//     const { lat, lon } = formattedCurrentWeather;

//     const formattedForecastWeather = await getWeatherData("forecast", {
//         lat,
//         lon,
//         exclude: "current,minutely,alerts",
//         units: searchParams.units,
//     }).then(formatForecastWeather);

//     return { ...formattedCurrentWeather, ...formattedForecastWeather };

//     // return formattedCurrentWeather
// };
// const formatToLocalTime = (
//     secs,
//     zone,
//     format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
// ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
// const iconUrlFromCode = (code) =>
//     `http://openweathermap.org/img/wn/${code}@2x.png`;
// export default getFormattedWeatherData;
// export { formatToLocalTime, iconUrlFromCode };






import { DateTime } from "luxon";

const API_KEY = "64899b97d4d413020b7b2fccf4461e4a";
// const API_KEY = "f8f150d76a81a745e36374d218353ec7";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    const { main: details, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
    };
};

const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        };
    });

    hourly = hourly.slice(1, 6).map((d) => {
        return {
            title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
            temp: d.temp,
            icon: d.weather[0].icon,
        };
    });

    return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };