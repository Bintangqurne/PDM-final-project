import { BiChevronDown } from "react-icons/bi";

export default function Selector() {
    return(
        <>
            <div className="w-72 font-medium h-80">
                <div className="bg-white w-full p-2 flex items-center justify-between rounded-xl">
                        Pilih Meja
                    <BiChevronDown size={20}/>
                </div>
                <ul className="bg-white mt-2">
                    <li>Meja 1</li>
                </ul>
            </div>
        </>
    )
}