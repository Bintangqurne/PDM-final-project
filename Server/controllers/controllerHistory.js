const {Product, History, Order, Table} = require("../models")
const { sequelize } = require('../models'); // Pastikan sequelize di-import jika tidak otomatis tersedia
class ControllerHistoryCustomer{

    static async historyProduct(req, res, next) {
        const t = await sequelize.transaction(); // Mulai transaksi
        try {
            const { productId } = req.params;
            const userId = req.user?.id || null;
            let { name, description, price, image, tableId, orderType, quantity } = req.body; // Hilangkan orderId dari body request
        
            // Validasi orderType dan tableId
            if (orderType === 'dine in' && (!tableId || isNaN(tableId))) {
                throw { name: 'TableRequired', message: 'TableId wajib diisi untuk dine in.' };
            }
            if (orderType === 'pick up') {
                tableId = null; // Set tableId ke null untuk pick up
            }
        
            // Cek apakah meja tersedia hanya untuk dine in
            if (orderType === 'dine in') {
                const table = await Table.findByPk(tableId, { transaction: t });
                if (!table || !table.isAvailable) {
                    throw { name: 'TableNotAvailable', message: 'Meja tidak tersedia untuk dipesan.' };
                }
            }
        
            // Cek produk dan stok
            const product = await Product.findByPk(productId, { transaction: t });
            if (!product) {
                throw { name: 'ProductNotFound', message: 'Produk tidak ditemukan.' };
            }
            if (product.amount <= 0 || quantity > product.amount) {
                throw { name: 'InsufficientStock', message: 'Jumlah produk tidak mencukupi.' };
            }
        
            // Kurangi stok produk
            product.amount -= quantity;
            await product.save({ transaction: t });
        
            // Hitung total harga
            const totalPrice = price * quantity;
        
            // Buat order baru
            const newOrder = await Order.create({
                userId,
                orderType,
                tableId,
                totalPrice,
                quantity,
            }, { transaction: t });
        
            // Buat history baru dengan menggunakan orderId dari newOrder
            const newHistory = await History.create({
                name,
                description,
                price,
                image,
                productId,
                tableId,
                orderType,
                userId,
                orderId: newOrder.id // Gunakan ID order yang baru dibuat
            }, { transaction: t });
        
            await t.commit(); // Commit transaksi jika semua sukses
        
            res.status(201).json({
                message: 'Order dan History berhasil dibuat.',
                order: newOrder,
                history: newHistory
            });
        
        } catch (error) {
            await t.rollback(); // Rollback transaksi jika terjadi error
            console.error(error);
            if (error.name === 'TableRequired' || error.name === 'TableNotAvailable' || error.name === 'InsufficientStock' || error.name === 'ProductNotFound') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    
    
    static async productCustomer(req, res, next) {
        try {
            let { search, sort, filter, page } = req.query;
    
            let option = { 
                order : [ 
                    ['id', 'ASC']
                ],
            };
    
            // kondisi search
            if (search) {
                option.where = {
                    name: { 
                        [Op.iLike]: `%${search}%` 
                    },
                };
            }
    
            // kondisi filter berdasarkan categoryId
            if (filter){
                option.where = {
                    categoryId : {
                        [Op.eq]: `${filter}`
                    }
                }
            }
    
            // kondisi sorting
            if (sort) {
                if (sort === 'ASC') {
                    option.order = [
                    ['updatedAt', 'ASC']
                    ]
                }
                if (sort === 'DESC') {
                    option.order = [
                    ['updatedAt', 'DESC']
                    ]
                }
                    
            }
            
                const limit = 10;
                const offset = (page - 1) * limit || 0;
    
                option.limit = limit;
                option.offset = offset;
    
            let data = await Product.findAll(option);
    
            if (!data) {
                throw {name : 'error not found'}
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }
    
    static async history(req, res, next) {
        try {
          let { search, sort, filter, page } = req.query;
      
          let option = {
            order: [['id', 'ASC']], // Default order berdasarkan id
          };
      
          // Kondisi untuk pencarian berdasarkan 'name'
          if (search) {
            option.where = {
              name: { 
                [Op.iLike]: `%${search}%` 
              },
            };
          }
      
          // Kondisi untuk filter berdasarkan 'categoryId'
          if (filter) {
            // Jika sudah ada where sebelumnya, kita gabungkan dengan filter
            option.where = option.where || {};
            option.where.categoryId = {
              [Op.eq]: filter
            };
          }
      
          // Kondisi untuk sorting berdasarkan 'updatedAt'
          if (sort) {
            if (sort === 'ASC') {
              option.order = [
                ['updatedAt', 'ASC']
              ];
            } else if (sort === 'DESC') {
              option.order = [
                ['updatedAt', 'DESC']
              ];
            }
          }
      
          // Handling pagination: limit dan offset
          const limit = 10; 
          const offset = (page - 1) * limit || 0; 
      
          option.limit = limit;
          option.offset = offset;
      
          // Ambil data history dari database
          const data = await History.findAll({
            where: {
              userId: req.user.id, 
              ...option.where, 
            },
            order: option.order, 
            include: [{
                model: Order,
                attributes: ['totalPrice', 'quantity']
            }]
          });
      
          if (data.length === 0) {
            return res.status(404).json({ message: "Tidak ada history" });
          }
      
          // Menghitung total data yang sesuai dengan kondisi query
          const total = await History.count({
            where: {
              userId: req.user.id,
              ...option.where,
            },
            
          });
      
          return res.status(200).json({
            message: 'Berhasil Mengambil Data History',
            total, 
            data, 
            totalPages: Math.ceil(total / limit), 
            currentPage: page || 1, 
          });
      
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "Terjadi kesalahan di server" });
        }
      }
      

    static async historyById(req, res, next){
        try {
            const {id} = req.params;
            let data = await History.findByPk(id, {
                where: {
                    userId: req.user.id
                },
                include: [{
                    model: Order,
                    attributes: ['totalPrice', 'quantity']
                }]
            });
            if (!data) {
                throw {name : 'Data not found'};
            } else {
                res.status(200).json(data);
            }
        } catch (error) {
            console.log(error);    
        }
    }

    static async deleteHistory(req, res, next){
        try {
            const id = req.params.historyId;
            const data = await History.findOne({
                where: {
                    userId: req.user.id,
                    id
                }
            })

            if (!data) {
                return res.status(403).json({  
                    message: "History not found or Unauthorized"
                });
            }

            let deleted = await History.destroy({
                where : {
                    id,
                    userId: req.user.id
                }
            })

            if (deleted !== 0) {
                res.json({
                    message : `History Pemesanan with ${id} deleted successfully`
                })
            } else {
                throw {name: "error not found"}
            }
        } catch (error) {
            console.log(error);   
        }
    }
}

module.exports = ControllerHistoryCustomer