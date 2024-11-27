const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const {User} = require("../models")

class controllerUser{
    static async register(req, res, next) {
        try {
          const { username, password, role} = req.body;
    
          const newUser = await User.create({
            username,
            password,
            role,
          });
          if (!email.trim()) {
            throw { name : 'SequelizeValidationError'}
          } else if(!password.trim()) {
            throw { name : 'SequelizeValidationError'}
          }
          
          res.status(201).json({ id: newUser.id });
        } catch (error) {
          next(error)
        }
      }

      static async login(req, res, next) {
        try {
          // 1. nge cek email di db => apa ada atau tidak
          const { email, password } = req.body;
          const findUser = await User.findOne({
            where: {
              email,
            },
          });
    
          //   1.a. kalo misal ga ketemu user di db => kasih error
          if (!findUser) {
            throw { name: "email_salah" };
          }
          
          const checkPassword = comparePassword(password, findUser.password);
          if (!checkPassword) {
            throw { name: "password_salah" };
          }
          
          //   3. kita bikinin token untuk client simpen
          const access_token = createToken({
            id: findUser.id
          });
    
          if (!email.trim()) {
            throw { name : 'SequelizeValidationError'}
          } else if(!password.trim()) {
            throw { name : 'SequelizeValidationError'}
          }
          
          res.status(200).json({ access_token });
        } catch (error) {
          console.log(error);
          next(error)
          
        }
      }
    
}