const { Category } = require('../models')

class ControllerCategories{
    static async createCategories(req, res, next){
        try {
            let {name} = req.body
            const newPost = await Category.create({name})

            if (!newPost) {
                throw { name: 'error not found'}
            } else {
                res.status(200).json(newPost)
            }
        } catch (error) {
            next(error) 
        }
    }

    static async Categories(req, res, next){
        try {
            let data = await Category.findAll()
            
            if (!data) {
                throw { name: 'error not found'}
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
           next(error)            
        }
    }

    static async updateCategories(req, res, next){
        try {
            const { id } = req.params
            const { name } = req.body
            const updated = await Category.update({ name },{
                where : {
                    id
                },
                returning : true
            })
            if (!updated) {
                throw { name: 'error not found'}
            } else {
                json(updated)
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategories(req, res, next){
        try {
            const { id } = req.params
            const deleted = await Category.destroy({
            where : {
                id
            }
            })
            if (deleted !== 0) {
                res.json({
                    message : `Cuisine with id ${id} deleted successfully`
                })
            } else {
                throw { name : 'error not found'}
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerCategories