"use client";
import { useState } from "react"
import styles from "./styles.module.css"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailSpan, setEmailSpan] = useState(false)
    const [passwordSpan, setPasswordSpan] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3001/user/login", { email, password }, { withCredentials: true });

            if (response.data.success) {
                router.push('/');
            } else {
                if(response.data.message === "Email"){
                    setEmailSpan(true)
                    setTimeout(() => {
                        setEmailSpan(false)
                    }, 5000)
                }

                else if(response.data.message === "Password"){
                    setPasswordSpan(true)
                    setTimeout(() => {
                        setPasswordSpan(false)
                    }, 5000)
                }
            }
        } catch (error) {
            console.error('Register error:', error);
            alert('An error occurred. Please try again.');
        }

        setEmail("")
        setPassword("")
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <h1 className={styles.title}>Login</h1>
                <div className={styles.form}>
                    <label className={styles.label}>Email or Username</label>
                    <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    {
                        emailSpan && <span className={styles.span}>*Wrong email or username</span>
                    }

                    <label className={styles.label}>Password</label>
                    <input className={styles.input} value={password} onChange={e => setPassword(e.target.value)} type="text" />
                    {
                        passwordSpan && <span className={styles.span}>*Wrong password</span>
                    }

                    <button className={styles.btn} onClick={e => handleSubmit(e)}>Log In</button>
                    <p className={styles.minText}>Are you new? <Link className={styles.link} href="/auth/register">Sign Up</Link></p>
                </div>
            </div>
        </div>

    )
}