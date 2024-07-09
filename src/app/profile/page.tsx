"use client"
import {useState, useEffect} from "react"
import axios from "axios";
import AppBar from "../components/appbar"

function Profile(){
    const [loginUser, setLoginUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://localhost:3001/page/home", { withCredentials: true })
            console.log(response.data.loginUser);            
            setLoginUser(response.data.loginUser)           
        }
        
        fetchUser()
    },[])


    return (
        <div>
            <AppBar user={loginUser}/>
        </div>
    )
}

export default Profile