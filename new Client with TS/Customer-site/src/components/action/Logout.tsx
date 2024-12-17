import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Logout() {
    const navigate = useNavigate()
    const handleLogout = () => {
      Swal.fire({
        title: "Apakah kamu yakin?",
        text: "Kamu harus memasukkan akun ulang!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Iya saya yakin!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Keluar!",
            text: "Kamu sukses keluar dari akun",
            icon: "success"
          });
          localStorage.removeItem("access_token");
          navigate('/login');
        }
      });
    }
    
    return(
        <>
          <button onClick={handleLogout} className="text-sm font-semibold leading-6 text-red-600">
            Keluar <span aria-hidden="true">&rarr;</span>
          </button>
        </>
    )
}