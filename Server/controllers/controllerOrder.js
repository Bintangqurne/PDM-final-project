const {Order, History} = require("../models")

class controllerOrder{
    static async getOrder(req, res, next){
        try {
            const data = await Order.findAll({
                where: {
                    userId: req.user.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            console.log();
        }
    }

    static async getOrderById(req, res, next) {
        try {
            const { id } = req.params;
    
            // Mengambil data order dan menyertakan data user yang terkait
            const order = await Order.findByPk(id, {
                where: {
                    id,
                    userId: req.user.id,  // Pastikan hanya mengambil milik user yang sedang login
                },
                include: [{
                    model: History,   // Menyertakan data User yang terkait dengan Order
                    attributes: ['name', 'description', 'image', 'productId', 'tableId'],  // Menyaring kolom yang ingin ditampilkan
                }],
            });
    
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
    
            return res.status(200).json(order);
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    
}

module.exports = controllerOrder