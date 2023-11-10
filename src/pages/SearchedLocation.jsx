import { useGlobalContext } from "../context/Context";
import Clear from "../assets/images/clear-sky.jpg";
import Cloudy from "../assets/images/cloudy.jpg";
import Rainy from "../assets/images/rainy-day.jpg";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import SavedLocation from "../components/SavedLocation";

export const SearchedLocation = () => {
    const {searchedCityData} = useGlobalContext();
    const {year, date, minutes, hours, monthName, dayName} = useGlobalContext();

    let cityIcon = `https://openweathermap.org/img/wn/${searchedCityData.icon}.png`

  return (
    <div className="font-Jost min-h-screen text-white flex justify-between bg-opac relative"
        style={
            searchedCityData.weather === 'Clear' 
            ? {backgroundImage: `url(${Clear})`}
            : searchedCityData.weather === 'Clouds'
            ? {backgroundImage: `url(${Cloudy})`}
            : {backgroundImage: `url(${Rainy})`}}
    >
        <div className="lg:my-0 px-3 lg:pt-6 flex items-center justify-center w-full bg-blur">
        <div className="lg:h-[80%] w-full md:px-10 lg:ps-8 lg:w-3/5 px-3 shadow-2xl rounded-2xl city-detail">
          <Link to="/">
            <div className="bg-[#ccc] w-10 h-10 my-4 text-black text-lg cursor-pointer lg:mt-8 flex items-center justify-center rounded-[50%]">
              <BsArrowLeft />
            </div>
          </Link>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center">
            <div className="mt-3">
              <p className="text-2xl mb-3 font-bold">{searchedCityData.name}</p>
              <p className="lg:text-[20px] md:text-[18px] text-xs">{hours}:{minutes < 10 ? '0'+minutes : minutes} {hours > 11 ? <span>PM</span> : <span>AM</span>} - {dayName}, {monthName} {date}, {year}</p>
            </div>            
          </div>

          <div className="flex mt-2 flex-col lg:flex-row justify-between">
            <div className="flex w-full sm:w-[70%] justify-between sm:my-4 mx-auto gap-5 items-center sm:justify-center xl:gap-5 xl:w-2/4 lg:border-r-2 lg:border-gray-200">
              <div className="h-[5rem] w-[5rem] xl:h-[6rem] xl:w-[8rem]">
                <img className="h-full w-full" src={cityIcon} alt="" />
              </div>
              <div className="flex flex-col justify-center items-center px-1">
                <p className="text-3xl sm:text-5xl xl:text-6xl font-bold">{searchedCityData.temp}&deg;</p>
                <p className="text-lg font-semibold">{searchedCityData.weather}</p>
              </div>
            </div>
            <div className="w-full sm:w-[90%] sm:mx-auto xl:w-2/4 grid grid-rows-2 sm:gap-8 lg:gap-4">
              <div className="grid grid-cols-3 sm:gap-3 lg:gap-1 mt-8 xl:my-4">
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{searchedCityData.temp_max}</p>
                  <p className="font-normal xl:font-medium">High</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{searchedCityData.windSpeed}mph</p>
                  <p className="font-normal xl:font-medium">Wind</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{searchedCityData.humidity}%</p>
                  <p className="font-normal xl:font-medium">Humidity</p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:gap-3 lg:gap-1 my-2 xl:my-4">
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{searchedCityData.temp_min}</p>
                  <p className="font-normal xl:font-medium">Low</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">{searchedCityData.pressure}in</p>
                  <p className="font-normal xl:font-medium">Pressure</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-xl sm:text-2xl xl:text-2xl">41%</p>
                  <p className="font-normal xl:font-medium">Precipitation</p>
                </div>
              </div>
            </div>
          </div>          
            <Link to="/saved" className="w-full sm:w-[60%] sm:mx-auto xl:w-3/4 xl:mx-auto flex justify-center my-5">
              <button className="w-full sm:w-3/4 bg-white text-[#0077be] text-lg py-2 sm:px-6 rounded-md border-2 border-[#0077be]">View Saved Locations</button>
            </Link>          
        </div>
      </div>
      <SavedLocation />
    </div>
  )
}    
