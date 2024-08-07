"use client";
import { useState } from "react";
import styles from "./styles.module.css"
import axios from 'axios';
import Link from "next/link"
import { useRouter } from "next/navigation";

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [userNameSpan, setUserNameSpan] = useState(false)
    const [emailSpan, setEmailSpan] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post("https://sos-backend-4a2p.onrender.com/user/register", { userName, email, password }, { withCredentials: true });

            if (response.data.success) {
                setSuccessMessage(true)
                setTimeout(() => {
                    setSuccessMessage(false)
                }, 2000)
                setTimeout(() => {
                    router.push('/auth/login');                    
                }, 2300)
            } 
            else {
                if(response.data.message === "username"){
                    setUserNameSpan(true)
                    setTimeout(() => {
                        setUserNameSpan(false)
                    }, 5000)
                }
                else if(response.data.message === "email"){                    
                    setEmailSpan(true)
                    setTimeout(() => {
                        setEmailSpan(false)
                    }, 5000)
                }                
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
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>Register</h1>
                <div className={styles.form}>
                    {
                        successMessage && <span className={styles.spanSuccess}>*Register Successful</span>
                    }
                    <label className={styles.label}>Username</label>
                    <input className={styles.input} value={userName} onChange={e => setUserName(e.target.value)} type="text" />
                    {
                        userNameSpan && <span className={styles.span}>*This username is already taken.</span>
                    }

                    <label className={styles.label}>Email</label>
                    <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    {
                        emailSpan && <span className={styles.span}>*This email is already exist.</span>
                    }

                    <label className={styles.label}>Password</label>
                    <input className={styles.input} value={password} onChange={e => setPassword(e.target.value)} type="text" />

                    <button className={styles.btn} onClick={e => handleSubmit(e)}>Submit</button>
                    <p className={styles.minText}>Already registered? <Link className={styles.link} href="/auth/login">Log In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register