import axios from '../config/instance';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Resto from "../assets/Resto.jpg"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { FiMail, FiLock } from 'react-icons/fi';  // Import icons from react-icons

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      alert("Email dan Password harus diisi");
      return;
    }

    try {
      const { data } = await axios({
        url: '/login',
        method: 'post',
        data: {
          email: loginForm.email,
          password: loginForm.password,
        },
      });

      console.log(data);
      localStorage.setItem('access_token', data.access_token);
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleCredentialResponse = async (response: google.accounts.id.CredentialResponse) => {
    const credential = response.credential;
    console.log(credential); 
    try {
      const { data } = await axios.post(
        "/google-login",
        {},
        {
          headers: {
            ["google-token"]: credential,
          },
        }
      );
      console.log(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      // Client ID should be in your .env file for security reasons
      client_id: "320510485748-mpcd0qchf637cd7g2lu10dcisr8hm5gg.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-login"),
      {
        theme: "outline",
        size: "large",
      }
    );

    google.accounts.id.prompt(); // Display one-tap dialog if appropriate
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Gambar latar belakang */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: `url(${Resto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'inset 0px -10px 300px rgba(0, 0, 0, 0.7)',  // Shadow hanya di bawah
        }}
      ></div>
      <div className="flex items-center justify-center h-full w-full absolute top-0 left-0 z-10 backdrop-blur-[2px]">
        <Card className="w-[380px] h-[500px] bg-gradient-to-t from-[#FBFBFB] via-[#FBFBFB] to-[#6bc09f] opacity-90 ">
          <CardHeader className="pt-14 flex justify-center items-center">
            <CardTitle className="text-xl">Selamat Datang Kembali!</CardTitle>
            <CardDescription className="text-sm text-[#0e130e] text-center">Anda bisa mengakses fitur kami dengan melakukan login.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="grid w-full gap-2">
                <div className="relative flex flex-col space-y-1.5">
                  {/* Email Input with Icon */}
                  <FiMail className="absolute left-3 top-[25px] size-5 transform -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="pl-10 rounded-[5px]" // Padding left for icon
                  />
                </div>
                <div className="relative flex flex-col space-y-1.5 pb-4">
                  {/* Password Input with Icon */}
                  <FiLock className="absolute left-3 top-[24px] size-5 transform -translate-y-1/2 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="pl-10 rounded-[5px]" // Padding left for icon
                  />
                </div>
                <Button 
                  type="submit"
                  variant="default"
                  className="rounded-[5px] bg-zinc-800"
                >
                  Masuk
                </Button>
              </div>
            </form>
            <div className="flex justify-center pt-3">
              <CardTitle className="items-center flex">Belum memiliki akun?</CardTitle>
              <Button variant="link" className="text-green-600" onClick={() => navigate('/register')}>Daftar</Button>
            </div>
            <p className="text-center text-sm text-[#3d3c39] opacity-50">Atau masuk menggunakan</p>
  
            {/* Google Sign In Button */}
            <div
              id="google-login"
              style={{
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
};

export default Login;
