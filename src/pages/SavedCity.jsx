import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import bgSaved from '../assets/images/favorite.jpg'

const SavedCity = () => {
  return (
    <div style={{backgroundImage: `url(${bgSaved})`}}
     className="h-screen bg-no-repeat bg-cover lg:my-0 my-14 xl:my-0 flex text-white items-center justify-center w-full">
        <div className="text-center xl:w-full w-[90%] lg:w-[70%] sm:px-12 px-5 py-2 xl:py-8 xl:px-[4rem]">
          <Link to="/">
            <div className="bg-[#ccc] w-[2.5rem] h-[2.5rem] my-4 sm:w-[3rem] sm:h-[3rem] cursor-pointer xl:my-8 flex items-center justify-center rounded-[50%]">
              <BsArrowLeft />
            </div>
          </Link>

          <h2 className="font-bold">Saved Locations</h2>   
          <p className="my-4">Find your saved locations here</p> 
          <p>You do not have a location saved yet. Your saved locations will show up here when you save them.</p>  
        </div>        
      </div>
  )
}

export default SavedCity