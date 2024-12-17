let midtransClient = require('midtrans-client');
let { User, Product, History } = require('../models');

module.exports = class PaymentController {
  // Endpoint untuk membuat token Midtrans
// Endpoint untuk membuat token Midtrans
static async getMidtransToken(req, res, next) {
    const { productId, quantity } = req.body;
    const product = await Product.findByPk(productId);
  
    // Buat transaksi dan dapatkan token Midtrans
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-bFsbc8FLgh5_gSqoN_65KYne",
    });
  
    const parameter = {
      transaction_details: {
        order_id: "Order" + Math.random(),
        gross_amount: product.price * quantity,
      },
      customer_details: {
        first_name: req.user.username,
        last_name: "-",
        email: req.user.email,
      },
      item_details: [
        {
          name: product.name,
          quantity: quantity,
          price: product.price,
        },
      ],
    };
  
    try {
      let response = await snap.createTransaction(parameter);
      // Kirim juga productId dan quantity ke frontend
      res.json({ token: response.token, productId, quantity });
    } catch (error) {
      console.log(error)
    }
  }
  

  // Endpoint untuk menerima callback dan update status transaksi
  static async updateSuccess(req, res, next) {
    const { order_id, productId, quantity } = req.body;  // Mendapatkan productId dan quantity yang dikirim frontend saat membuat token
  
    try {
      // Cek status transaksi di Midtrans menggunakan API
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
  
      let status = await snap.transactionStatus(order_id);
  
      // Jika transaksi berhasil (settlement), lakukan pemrosesan lebih lanjut
      if (status.transaction_status === 'settlement') {
        const { name, description, price, image, tableId, orderType } = req.body;
        
        // Ambil produk dan update stok
        const product = await Product.findByPk(productId);
        if (!product) throw { name: 'ProductNotFound', message: 'Product not found' };
  
        product.amount -= quantity;
        await product.save();
  
        // Hitung total harga
        const totalPrice = price * quantity;
  
        // Buat order baru
        const newOrder = await Order.create({
          userId: req.user.id,
          totalPrice,
          quantity,
          productId,
          orderId: order_id,
        });
  
        // Buat history pembelian
        const newHistory = await History.create({
          name,
          description,
          price,
          image,
          productId,
          tableId,
          orderType,
          userId: req.user.id,
          orderId: newOrder.id,
          transactionStatus: status.transaction_status,
        });
  
        // Mengembalikan response sukses
        res.status(200).json({
          message: 'Payment successfully processed and history created.',
          order: newOrder,
          history: newHistory,
        });
      } else {
        res.status(400).json({ message: 'Payment failed or pending' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  
  
  
};
