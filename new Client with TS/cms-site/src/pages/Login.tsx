import axios from '../config/instance';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Awan from "../assets/Awan.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    <div
      className="flex items-center justify-center h-screen w-full"
      style={{
        background: `url(${Awan})`, // Ensure the image is in the public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div>
        <Card className="w-[380px] h-[500px] items-center bg-gradient-to-t from-[#FBFBFB] via-[#FBFBFB] to-[#D4F6FF] opacity-90">
          <CardHeader className="pt-14 flex justify-center items-center">
            <CardTitle className="text-xl">Selamat Datang Kembali!</CardTitle>
            <CardDescription className="text-sm text-[#716d66] text-center">Anda bisa mengakses fitur kami dengan melakukan login.</CardDescription> 
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
                  Submit
                </Button>
              </div>
            </form>
            <div className="flex justify-center pt-3">
              <CardTitle className="items-center flex">Do not have an account?</CardTitle>
              <Button variant="link" className="text-sky-600" onClick={() => navigate('/register')}>Sign Up</Button>
            </div>
            <p className="text-center text-sm text-[#716d66] opacity-50">Or Sign In With</p>

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
