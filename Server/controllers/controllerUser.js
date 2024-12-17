const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const {User} = require("../models")
const {OAuth2Client} = require('google-auth-library');


class controllerUser{
    static async register(req, res, next) {
        try {
          const { email, username, password, role} = req.body;
    
          const newUser = await User.create({
            email,
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

static async googleLogin(req, res, next) {
  const token = req.headers['google-token'];
  const client = new OAuth2Client();

  try {
    // Verifikasi token Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // CLIENT_ID aplikasi yang mengakses backend
    });

    // Ambil payload dari token
    const payload = ticket.getPayload();
    console.log(payload, 'ini payload');
    const email = payload['email']; // Mengambil email dari payload
    const image = payload['picture']; // Mengambil gambar profil dari payload

    // Cek apakah pengguna sudah ada di database
    let user = await User.findOne({
      where: { email },
    });

    // Jika pengguna tidak ditemukan, buat pengguna baru
    if (!user) {
      user = await User.create({
        username: payload.name,
        email,
        password: 'Pdm-password-' + Date.now(), // Password placeholder, bisa diubah
        image,
      }, {
        hooks: false, // Nonaktifkan hooks jika tidak diperlukan
      });
    }

    // Setelah menemukan atau membuat pengguna, buat token akses
    const access_token = createToken({ id: user.id });

    // Kirimkan token akses sebagai respons
    res.status(200).json({ access_token });
  } catch (error) {
    console.log(error);
    next(error); // Panggil next untuk error handling middleware
  }
}

    
}

module.exports = controllerUser