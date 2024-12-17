export interface DataHistory {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    productId: number;
    userId: number;
    orderType: number;
    tableId: number;
    orderId: number;
    createdAt: string;
    updatedAt: string;
    Order: Order;
  };
  
  export type typeDataHistory = {
    data: DataHistory[]
  }

  // Tipe untuk Order yang terkait dengan History
interface Order {
  totalPrice: number;
  quantity: number;
}

// Tipe untuk History yang mencakup Order
export interface HistoryById {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  productId: number;
  userId: number | null;
  orderType: string;
  tableId: number;
  orderId: number;
  createdAt: string;
  updatedAt: string;
  Order: Order;  // Menyertakan data Order sebagai objek terpisah
}

export interface HistoryByIdResponse {
  data: HistoryById;  // Data history berdasarkan ID
  status: string;     // Status dari request (misalnya success)
  message?: string;   // Pesan tambahan jika ada
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string;
  categoryId: number
}
