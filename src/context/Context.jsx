/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react"

const weatherCastContext = React.createContext();

export const WeatherCastContextProvider = ({ children }) => {
  const [hideSaved, setHideSaved] = useState(false)
  const [weatherData, setWeatherData] = useState({
        name: '',
        temp: '',
        weather: '',
        icon: '',
        humidity: '',
        windSpeed: '',
  })
  const [searchedCityData, setSearchedCityData] = useState({
        name: '',
        temp: '',
        weather: '',
        icon: '',
        humidity: '',
        windSpeed: '',
  })
  const today = new Date();
    const year = today.getFullYear()
    const month = today.getMonth()
    const date = today.getDate()
    const day = today.getDay()
    const minutes = today.getMinutes()
    const hours = today.getHours()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let monthName = months[month] 
    let dayName = days[day]
  return(
    <weatherCastContext.Provider value={{
      weatherData,
      setWeatherData,
      searchedCityData,
      setSearchedCityData,
      hideSaved,
      setHideSaved,
      year,
      date,
      minutes,
      hours,
      monthName,
      dayName
      }}>
      {children}
    </weatherCastContext.Provider>
  )
};

export const useGlobalContext = () => {
  return useContext(weatherCastContext)
};