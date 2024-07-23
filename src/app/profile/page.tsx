"use client"
import { useState, useEffect } from "react"
import axios from "axios";
import { HiPencilSquare } from "react-icons/hi2";
import AppBar from "../components/appbar"
import styles from "./styles.module.css"

function Profile() {
    const [loginUser, setLoginUser] = useState<any>();
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShow, setIsShow] = useState(false)
    const [isUsernameInputDisable, setIsUsernameInputDisable] = useState(true)
    const [isEmailInputDisable, setIsEmailInputDisable] = useState(true)
    const [userNameSpan, setUserNameSpan] = useState(false)
    const [emailSpan, setEmailSpan] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)


    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("https://sos-backend-4a2p.onrender.com/page/home", { withCredentials: true })
            setLoginUser(response.data.loginUser)
        }

        fetchUser()
    }, [])

    const handleShow = () => {
        setIsShow(!isShow)
    }

    const handleUsername = () => {
        setIsUsernameInputDisable(!isUsernameInputDisable)
    }

    const handleEmail = () => {
        setIsEmailInputDisable(!isEmailInputDisable)
    }

    const updateUser = async () => {

        if (userName != "") {
            loginUser.userName = userName

        } else if (email != "") {
            loginUser.email = email

        } else if (password != "") {
            loginUser.password = password
        }

        const response = await axios.post('https://sos-backend-4a2p.onrender.com/user/update', { loginUser }, { withCredentials: true });
        setLoginUser(response.data.user)

        if (response.data.success) {
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false)
            }, 5000)

        } else {

            if (response.data.message == "username") {
                setUserNameSpan(true)
                setTimeout(() => {
                    setUserNameSpan(false)
                }, 5000);

            } else if (response.data.message == "email") {
                setEmailSpan(true)
                setTimeout(() => {
                    setEmailSpan(false)
                }, 5000);
            }
        }

        setUserName("")
        setEmail("")
        setPassword("")
        setIsUsernameInputDisable(true)
        setIsEmailInputDisable(true)
    }

    return (
        <div>
            <AppBar user={loginUser} />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{loginUser && loginUser.userName}</h1>
                    <div className={styles.infoLabel}>
                        {
                            successMessage && <span className={styles.spanSuccess}>*Update Successful</span>
                        }

                        <label className={styles.label}>Username</label>
                        <div>
                            <input className={styles.input} type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder={loginUser && loginUser.userName} disabled={isUsernameInputDisable} />
                            <button onClick={handleUsername}><HiPencilSquare className={styles.icon} /></button>
                            {
                                !isUsernameInputDisable && <button onClick={updateUser} className={styles.updateBtn}>Update</button>
                            }
                        </div>
                        {
                            userNameSpan && <span className={styles.span}>*This username is already taken</span>
                        }

                        <label className={styles.label}>Email</label>
                        <div>
                            <input className={styles.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={loginUser && loginUser.email} disabled={isEmailInputDisable} />
                            <button onClick={handleEmail}><HiPencilSquare className={styles.icon} /></button>
                            {
                                !isEmailInputDisable && <button onClick={updateUser} className={styles.updateBtn}>Update</button>
                            }
                        </div>
                        {
                            emailSpan && <span className={styles.span}>*This email is already taken</span>
                        }

                        <button className={styles.btn} onClick={handleShow}>Change Password</button>
                        {
                            isShow &&
                            <div>
                                <input className={styles.input1} type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="change password" />
                                <button onClick={updateUser} className={styles.updateBtn}>Update</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile