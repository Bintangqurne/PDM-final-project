const {Product, History} = require("../models")
const { Op } = require('sequelize');

class controllerProduct{
    static async createProduct(req, res, next){
        try {
            let {name, description, price, amount, image, categoryId} = req.body;
            const newProduct = await Product.create({
                name,
                description,
                price,
                amount,
                image,
                categoryId
            })

            res.status(201).json(newProduct);
        } catch (error) {
            console.log(error);
        }
    }

    static async product(req, res, next){
        try {
            let data = await Product.findAll()
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async productById(req, res, next){
        try {
            let {id} = req.params;
            let data = await Product.findByPk(id)
            if (!data) {
                throw{name: "Data not found"}
            } else {
                res.status(200).json(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteProduct(req, res, next){
        try {
            const {id} = req.params
            const deleted = await Product.destroy({
                where: {
                    id
                }
            })

            if (deleted !== 0) {
                req.json({
                    message: `Product With ${id} deleted Succesfully`
                })
            } else {
                throw {name : "error not found"}
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async updateProduct(req, res, next){
        try {
            const { id } = req.params
            const {name, description, price, amount, image, categoryId} = req.body
            const [numOfUpdatedRows, updatedCuisine] = await Product.update(
                { name, description, price, amount, image, categoryId },
                {
                    where: {
                        id
                    },
                    returning: true
                }
            );
    
            // Check if any rows were updated
            if (!numOfUpdatedRows) {
                throw { name : 'error not found'}
            } else if (numOfUpdatedRows > 0) {
                const [updatedObject] = updatedCuisine;
                res.status(200).json(updatedObject);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    static async productPublic(req, res, next) {
        try {
            let { search, sort, filter, page } = req.query;
    
            let option = { 
                order : [ 
                    ['id', 'ASC']
                ]
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
}

module.exports = controllerProduct