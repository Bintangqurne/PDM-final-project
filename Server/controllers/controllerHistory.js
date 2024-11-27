const {Product, History} = require("../models")

class controllerHistory{
    static async historyProduct(req, res, next){
        try {
            const {productId} = req.params;
            let {name, description, price, image} = req.body;
            const newHistory = await History.create({
                name, description, price, image, productId
            })
            
        if(!newHistory){
            throw {name: 'error not found'}
        }else {
            res.status(201).json(newHistory);
        }
        
    } catch (error) {
        console.log(error);
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
}

module.exports = controllerHistory