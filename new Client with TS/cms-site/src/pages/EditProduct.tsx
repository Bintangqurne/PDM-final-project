import IsiEdit from "@/components/IsiEdit";
import Navbar from "@/components/Navbar";

export default function EditProduct() {
    return(
        <>
        <Navbar/>
        <div className='text-white flex justify-center items-center bg-cover relative' style={{'backgroundImage': 'url("../src/assets/bg.jpg")', height: "100vh"}}>
            <IsiEdit/>
        </div>
        </>
    )
}