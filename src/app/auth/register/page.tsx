"use client";
import { useState } from "react";
import styles from "./styles.module.css"
import axios from 'axios';
import {useRouter} from "next/navigation";

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3001/user/register", { userName, email, password }, { withCredentials: true });

            if (response.data.success) {                
                router.push('/auth/login');
            } else {
                alert("Else: " + response.data.message);
            }
        } catch (error) {
            console.log('error\n:' + error);
            alert('An error occurred. Please try again.\n');
        }

        setEmail("")
        setPassword("")
        setUserName("")
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <div className={styles.form}>
                <label className={styles.label}>Username</label>
                <input className={styles.input} value={userName} onChange={e => setUserName(e.target.value)} type="text" />

                <label className={styles.label}>Email</label>
                <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="text" />

                <label className={styles.label}>Password</label>
                <input className={styles.input} value={password} onChange={e => setPassword(e.target.value)} type="text" />

                <button className={styles.btn} onClick={e => handleSubmit(e)}>Submit</button>
            </div>
        </div>
    )
}

export default Register