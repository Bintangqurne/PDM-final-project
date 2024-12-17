import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from '../../config/instance';
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function DeleteProduct({ productId } : {productId: number}) {
    const navigate = useNavigate();

    const handleDelete = () => {
        Swal.fire({
            title: "Apakah kamu yakin?",
            text: "Produk ini akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Iya, hapus produk!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Produk Terhapus!",
                    text: "Produk berhasil dihapus.",
                    icon: "success"
                });
                navigate('/product');
                axios.delete(`/product/${productId}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                    .catch((error) => {
                        Swal.fire({
                            title: "Gagal menghapus!",
                            text: "Terjadi kesalahan saat menghapus produk.",
                            icon: "error"
                        });
                        console.error("Error deleting product:", error);
                    });
            }
        });
    };

    return (
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
    );
}
