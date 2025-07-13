import React from "react";

const Navbar = () =>{
    return(
        <nav className="w-[100vw] bg-white p-[18px] flex justify-around">
            <ul className="flex w-[200px] justify-between">
                <li><a href="" className="font-bold hover:underline hover:text-[#b99b69] transition duration-300">Home</a></li>
                <li><a href="" className="font-bold hover:underline hover:text-[#b99b69] transition duration-300">Today's Task</a></li>
            </ul>
            <span className="font-bold hover:underline hover:text-[#b99b69] transition duration-300 cursor-pointer">Calendar</span>
        </nav>
    )
}

export default Navbar