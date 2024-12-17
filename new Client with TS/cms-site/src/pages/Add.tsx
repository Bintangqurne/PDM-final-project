import IsiAdd from "@/components/IsiAdd";
import Navbar from "@/components/Navbar";

export default function Add() {
    return(
        <>
        <Navbar/>
            <div className='text-white flex justify-center items-center bg-cover relative' style={{'backgroundImage': 'url("../src/assets/bg.jpg")', height: "100vh"}}>
        <IsiAdd/>
      </div>
        </>
    )
}