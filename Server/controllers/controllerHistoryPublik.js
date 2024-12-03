const {Product, History, Order, Table} = require("../models")

class controllerHistoryPublik{
    static async historyProductPub(req, res, next) {
        try {
            const { productId } = req.params;
            let { name, description, price, image, tableId, orderType, quantity } = req.body;
    
            const table = await Table.findByPk(tableId);
            if (!table || !table.isAvailable) {
                throw { name: 'TableNotAvailable', message: 'Meja tidak tersedia untuk dipesan.' };
            }
    
            const totalPrice = price * quantity; 
    
            const newOrder = await Order.create({
                orderType,
                tableId,
                totalPrice
            });
    
            const newHistory = await History.create({
                name,
                description,
                price,
                image,
                productId,
                tableId,
                orderType,
            });
    
            if (!newHistory) {
                throw { name: 'NotFoundError', message: 'History gagal dibuat.' };
            }
    
            res.status(201).json({
                message: 'Order dan History berhasil dibuat.',
                order: newOrder,
                history: newHistory
            });
        } catch (error) {
            console.log(error);
            if (error.name === 'TableNotAvailable') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    

    static async history(req, res, next){
        try {
            let data = await History.findAll();
            if (!data) {
                throw {name : 'Data not found'};
            } else {
                res.status(200).json(data);
            }
        } catch (error) {
            console.log(error);    
        }
    }

    static async historyById(req, res, next){
        try {
            const {id} = req.params;
            let data = await History.findByPk(id);
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
            const id = req.params.id;
            let deleted = await History.destroy({
                where : {
                    id
                }
            })

            if (deleted !== 0) {
                req.json({
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

module.exports = controllerHistoryPublik