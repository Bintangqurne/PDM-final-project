import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

export default function SelectTable() {
    // Menambahkan state untuk menyimpan meja yang dipilih
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    // Data meja, berisi meja 1 hingga meja 19
    const meja = Array.from({ length: 19 }, (_, index) => ({
        name: `Meja ${index + 1}`
    }));

    return (
        <>
            <div className="w-72 font-medium h-80">
                <div className="bg-white w-full p-2 flex items-center justify-between rounded-xl">
                    {selected ? selected : "Pilih Meja"} 
                    <BiChevronDown size={20} 
                    onClick={() => setOpen(!open)}/>
                </div>
                <ul className={`bg-white mt-2 overflow-y-auto max-h-60 ${open ? "max-h-60" : "max-h-0"}`}>
                    {meja.map((item) => (
                        <li
                            key={item.name} // Menggunakan item.name sebagai key yang unik
                            className="p-2 text-sm hover:bg-green-600 hover:text-white"
                            onClick={() => {
                                if (item?.name.toLowerCase() !== selected?.toLowerCase()) {
                                    setSelected(item?.name); 
                                }
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
