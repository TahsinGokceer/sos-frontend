"use client"
import {useState, useEffect} from "react"
import axios from "axios";
import { HiPencilSquare } from "react-icons/hi2";
import AppBar from "../components/appbar"
import styles from "./styles.module.css"

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
            
            <div className={styles.container}>
                <h1 className={styles.title}>{loginUser && loginUser.userName}</h1>
                <div className={styles.infoLabel}>
                    <p className={styles.info}>Username: {loginUser && loginUser.userName} <button><HiPencilSquare className={styles.icon}/></button></p>
                    <p className={styles.info}>Email: {loginUser && loginUser.email} <button><HiPencilSquare className={styles.icon}/></button></p>
                    <button className={styles.btn}>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default Profile