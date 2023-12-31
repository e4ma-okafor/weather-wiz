import { useState, useEffect } from "react"
import axios from "../api/axios"
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { useGlobalContext } from "../context/Context";
import Clear from "../assets/images/clear-sky.jpg";
import Cloudy from "../assets/images/cloudy.jpg";
import Rainy from "../assets/images/rainy-day.jpg"
import { CgClose } from "react-icons/cg";

const Home = () => {
    const API_KEY = '4660400fd2c1b34703f300efd87e600c'
    const [isLoading, setIsLoading] = useState(false);
    const {weatherData, setWeatherData, searchedCityData, setSearchedCityData} = useGlobalContext();
    const {year, date, minutes, hours, monthName, dayName} = useGlobalContext();
    const [inputData, setInputData] = useState('')
    const [appHistory, setAppHistory] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    let store = "appHistory";

    const getUserLocation = () => {
        try {
            setIsLoading(true);
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(position, latitude, longitude);

                    const response = await axios.get(`/data/2.5/weather?lon=${longitude}&lat=${latitude}&units=metric&appid=${API_KEY}`);

                    if (response.status === 200) {
                        setWeatherData({
                            temp: response.data.main.temp,
                            humidity: response.data.main.humidity,
                            windSpeed: response.data.wind.speed,
                            name: response.data.name,
                            weather: response.data.weather[0].main,
                            icon: response.data.weather[0].icon
                        });                        
                        setIsLoading(false);
                        console.log(response.data)
                    }
                })
            } 
        } catch (error) {
            console.log('Error fetching location', error);
        }

        const existingAppHistory = localStorage.getItem(store)
        if (existingAppHistory) {
            const histories = existingAppHistory.split(",")
            setAppHistory(histories)
        }
    }
    let imgURL = `https://openweathermap.org/img/wn/${weatherData.icon}.png`

    useEffect(() => {
        getUserLocation();
    }, []);

    const getInputData = (event) => {
        setInputData(event.target.value)
    }

    const getSearchedCity = async () => {
        try{
            const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${inputData}`)
            console.log(resp.data);
            setSearchedCityData({
                temp: resp.data.main.temp,
                humidity: resp.data.main.humidity,
                windSpeed: resp.data.wind.speed,
                name: resp.data.name,
                weather: resp.data.weather[0].main,
                icon: resp.data.weather[0].icon,
                temp_max: resp.data.main.temp_max,
                temp_min: resp.data.main.temp_min,
                precipitation: '41%',
                pressure: resp.data.main.pressure,
            })
        }catch(err) {
            console.log('Could not fetch city', err);
        }
    }

    const addToAppHistory = () => {
        const existingHistory = localStorage.getItem(store)
    
        if (existingHistory?.split(",").includes(inputData)) return;
    
        let updatedAppHistory = ""
        if (existingHistory) {
          updatedAppHistory = existingHistory + "," + inputData
        } else {
          updatedAppHistory = inputData
        }
        const histories = updatedAppHistory.split(",")
        localStorage.setItem(store, updatedAppHistory)
        setAppHistory(histories)
    }

    const SearchedCity = () => {        
        setIsClicked(true)        
        addToAppHistory()
        setInputData('')
        getSearchedCity()
    }

    const deleteSearchHistory = (index) => {        
        const updatedList = appHistory.filter((_, id) => id !== index);        
        localStorage.setItem(store, updatedList);
        setAppHistory(updatedList);
    }

  return (
    <div className="min-h-screen lg:pl-20 text-white font-bold font-Jost"
        style={
            weatherData.weather === 'Clear' 
            ? {backgroundImage: `url(${Clear})`}
            : weatherData.weather === 'Clouds'
            ? {backgroundImage: `url(${Cloudy})`}
            : {backgroundImage: `url(${Rainy})`}}
    >
        <h3 className="md:px-10 lg:px-0 text-lg p-5 xl:pt-10 xl:text-lg font-semibold">Weather-wiz</h3>
        {isLoading ? (
            <>                
                <div className="min-h-screen flex flex-col gap-20 justify-center items-center">                
                    <div>
                        <ReactLoading type="spin" color="#0066ff"
                            height={100} width={50} 
                        />
                    </div>
                    <div>
                        <p>Failed to fetch weather of current location.</p>
                        <p>Check your internet connectivity or enable your location</p>
                    </div>
                </div>
            </>
        ) : (
            <div className="">
                <div className="lg:flex gap-4">
                    <div className="md:px-10 lg:px-0 md:mb-20 lg:w-[55%] lg:flex md:flex gap-3 lg:pt-80">
                        <h1 className="mt-5 lg:mt-0 text-6xl font-semibold text-center mb-8 md:mb-0 xl:text-7xl xl:font-bold">{weatherData.temp}°</h1>
                        <div className="md:w-4/5 flex flex-col md:items-start md:mt-2 lg:mt-0 lg:gap-4 items-center justify-center font-semibold">
                            <p className="text-2xl xl:text-2xl xl:font-bold">{weatherData.name}</p> 
                            <p className="pb-2 lg:text-[20px] md:text-[18px] text-xs xl:font-semibold">{hours}:{minutes < 10 ? '0'+minutes : minutes} {hours > 11 ? <span>PM</span> : <span>AM</span>} - {dayName}, {monthName} {date}, {year}</p>
                        </div>
                        <div className="mb-4 lg:mb-0 md:items-start flex flex-col items-center">
                            <img src={imgURL} alt="" />
                            <p className="text-2xl xl:text-xl font-bold">{weatherData.weather}</p>
                        </div>                        
                    </div>
                    <div className="lg:relative">
                    <div className="w-full lg:w-[38%] h-full px-6 shadow-xl backdrop-blur-lg bg-[rgba(255,255,255,0.15)] lg:fixed top-0 right-0 pt-10">
                        <form>
                            <div className="flex justify-between font-normal w-full items-center bg-white border-none outline-none p-0.5 lg:p-1 rounded-md">
                                <input className="font-normal text-xs text-black placeholder:text-gray-600 w-11/12 focus:border-none focus:outline-none" type="text" placeholder="Search for a city" value={inputData} onChange={getInputData} />
                                <Link to="/search">
                                    <button onClick={SearchedCity} className="bg-[#0077be] rounded-md p-2">Search</button>
                                </Link>
                            </div>
                        </form>
                        <div className="mt-10 border-b-[1px] font-normal border-b-gray-400">
                            <p className="mb-4">Your Previous Searches</p>
                            {appHistory.length === 0 ? <p>No Searches Yet</p> : (
                                <div className="h-[7rem] overflow-y-scroll">
                                {appHistory.map((cities, index) => {
                                    return(
                                        <div key={index} className="flex justify-between mb-3 cursor-pointer items-center w-full">
                                            <Link to="/search">
                                                <p className="text-xl">{cities}</p>
                                            </Link>                                            
                                            <CgClose onClick={() => deleteSearchHistory(index)} className="text-3xl text-[#ff0000] p-1 rounded-md cursor-pointer bg-[#ccc]"/>
                                        </div>                
                                    )
                                })}
                                </div>
                            )}                            
                             
                        </div>
                        <div>                          
                            <h3 className="text-xl font-semibold mt-7 mb-5">Current Location Weather Detail</h3>
                            <div className="mb-3 flex justify-between items-center">
                                <p className="lg:text-xl text-sm font-semibold">Humidity</p>
                                <p className="lg:text-xl text-sm font-semibold">{weatherData.humidity}%</p>
                            </div>
                            <div className="mb-3 flex justify-between items-center">
                                <p className="lg:text-xl text-sm font-semibold">Temperature</p>
                                <p className="lg:text-xl text-sm font-semibold">{weatherData.temp}°C</p>
                            </div>          
                            <div className="mb-3 flex justify-between items-center">
                                <p className="lg:text-xl text-sm font-semibold">Windspeed</p>
                                <p className="lg:text-xl text-sm font-semibold">{weatherData.windSpeed} m/s</p>
                            </div>                            
                            <Link to='/saved' className="xl:mt-6">
                                <button className="lg:text-xl text-sm mb-7 mt-4 bg-white text-blue-500 py-3 px-7 rounded-md border border-blue-500 shadow-sm">View Saved Locations</button>
                            </Link>
                        </div>                                 
                    </div>
                    </div>
                </div>
            </div>            
        )
        }           
    </div>
  )
}

export default Home