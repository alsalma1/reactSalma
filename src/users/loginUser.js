import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser(){
    if(sessionStorage.getItem("username")){
        window.location.href = '/';
    }
    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const{username, password} = user

    const onInputChange=(e)=>{
        setUser({...user, [e.target.name]:e.target.value})

    }

    const onSubmit =async(e)=>{
        e.preventDefault();
        const result = await axios.post("http://localhost:8080/login",user);
        if(result.data.split("/")[0]=="error"){
            document.getElementById("error").innerHTML="Error amb el login";
        }
        else{
            sessionStorage.setItem('role', result.data.split("/")[0]);
            sessionStorage.setItem('username', result.data.split("/")[1]);
            window.location.href = '/homeadmin';
        }
    }
    return (
        <div className="container mt-5"> 
            <div className="row log">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow conLogin">
                    <h2 className="text-center m-4">Login</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Usuario</label>
                            <input type={"text"} className="form-control" placeholder="username" name="username" value={username} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type={"password"} className="form-control" placeholder="Password" name="password" value={password} onChange={(e)=>onInputChange(e)}/>
                        </div>
                        <button type="submit" className="btn btn-outline-primary submitAdmin botoncito">Enviar</button>
                        <div id="error" className="mb-3">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}