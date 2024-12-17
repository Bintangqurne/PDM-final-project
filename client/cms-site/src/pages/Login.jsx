import { useState } from "react";
import '../config/instance'
import {useNavigate} from "react-router-dom";
import {Form} from "../components/ui/form"
import { Button } from "../components/ui/button"


export default function Login() {
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })

    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            
            const {data} = await axios({
                url: '/login',
                method: 'post',
                data: {
                    email: loginForm.email,
                    password: loginForm.password
                }
            })

            localStorage.setItem('access_token', data.access_token);
            
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(e) {
        let {name, value} = e.target;
         setLoginForm({...loginForm,[name]: value })
      }



    return(
        <>
            <h1>Hello World</h1>
            <Form action={submitHandler}>
                <div className="">
                <input type="email" name="email" id="form-email" onChange={handleChange} />
                <input type="password" name="password" id="form-password" onChange={handleChange}/>
                <Button type="submit" name="" value="submit" className="mt-4"> Submit </Button>
                <Button variant="destructive">Secondary</Button>

                </div>
            </Form>
        </>
    )
}