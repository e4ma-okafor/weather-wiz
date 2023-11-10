import { useGlobalContext } from "../context/Context";
import { CgClose } from "react-icons/cg";
import { FcCheckmark } from "react-icons/fc";

const SavedLocation = () => {
  const { hideSaved, setHideSaved } = useGlobalContext();

  const toggleSaved = () => {
    setHideSaved(!hideSaved)
  }
  return (
    <div className={`absolute xl:w-[100%] h-full xl:h-[100%] py-12 w-full flex justify-center items-center bg-[#000000c9] ${hideSaved ? '' : 'hidden'}`}>
      <div className="xl:w-[40%] w-[90%]xl:absolute top-[25%] xl:left-[30%]">
        <div className="bg-white text-black p-6 rounded-xl">
          <div className="flex justify-end">
            <div onClick={toggleSaved} className="bg-[#ccc] w-[3rem] h-[3rem] rounded-[50%] flex justify-center items-center cursor-pointer">
              <CgClose className="h-8"/>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6 mb-12">
            <FcCheckmark className="font-bold text-7xl"/>
            <p className="font-semibold text-xl mt-2">Your search has been saved successfully</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavedLocation