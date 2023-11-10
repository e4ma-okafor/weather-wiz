import { useGlobalContext } from "../context/Context";
import Clear from "../assets/images/clear-sky.jpg";
import Cloudy from "../assets/images/cloudy.jpg";
import Rainy from "../assets/images/rainy-day.jpg";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import SavedLocation from "./SavedLocation";

export const SearchedLocation = () => {
    const {searchedCityData, setSearchedCityData, hideSaved, setHideSaved} = useGlobalContext();
    const {year, date, minutes, hours, monthName, dayName} = useGlobalContext();

    let cityIcon = `https://openweathermap.org/img/wn/${searchedCityData.icon}.png`
    console.log(searchedCityData.weather)

    const toggleSaved = () => {
        setHideSaved(!hideSaved)
     }

  return (
    <div className="font-Jost min-h-screen text-white flex justify-between bg-opac relative"
        style={
            searchedCityData.weather === 'Clear' 
            ? {backgroundImage: `url(${Clear})`}
            : searchedCityData.weather === 'Clouds'
            ? {backgroundImage: `url(${Cloudy})`}
            : {backgroundImage: `url(${Rainy})`}}
    >
        <div className="h-screen lg:my-0 my-14 xl:my-0 flex items-center justify-center w-full relative">
        <div className="xl:w-[60%] w-[90%] lg:w-[70%] sm:px-12 px-5 py-2 popup shadow-2xl rounded-2xl xl:py-8 xl:px-[4rem] absolute city-detail">
          <Link to="/">
            <div className="bg-[#ccc] w-[2.5rem] h-[2.5rem] my-4 sm:w-[3rem] sm:h-[3rem] cursor-pointer xl:my-8 flex items-center justify-center rounded-[50%]">
              <BsArrowLeft />
            </div>
          </Link>
          
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center my-5">
            <div className="my-3">
              <p className="text-2xl sm:text-4xl mb-3 xl:text-4xl font-bold">{searchedCityData.name}</p>
              <p>{hours}:{minutes} {hours > 11 ? <span>PM</span> : <span>AM</span>} - {dayName}, {monthName} {date}, {year}</p>
            </div>
            <div className="w-full sm:w-[30%] text-center my-5 xl:my-0">
              <button onClick={toggleSaved} className="bg-[#0077be] text-lg py-2 px-6 rounded-md">Save Location</button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex w-full sm:w-[70%] sm:my-4 mx-auto gap-5 items-center sm:justify-center xl:gap-5 xl:w-2/4 lg:border-r-2 lg:border-gray-200">
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

          <div className="w-full sm:w-[60%] sm:mx-auto xl:w-3/4 xl:mx-auto flex justify-center my-5">
            <button className="w-full sm:w-[80%] bg-white text-[#0077be] text-lg py-2 px-6 rounded-md border-2 border-[#0077be]">View Saved Locations</button>
          </div>
        </div>
      </div>
      <SavedLocation />
    </div>
  )
}    
