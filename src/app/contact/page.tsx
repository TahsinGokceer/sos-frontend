"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import AppBar from "../components/appbar"
import styles from "./styles.module.css"

function Contact() {
    const [loginUser, setLoginUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("https://sos-backend-4a2p.onrender.com/page/home", { withCredentials: true })
            setLoginUser(response.data.loginUser)
        }

        fetchUser()
    }, [])

    return (
        <div className={styles.background}>
            <div className={styles.appBarContainer}>
                <AppBar user={loginUser} />
            </div>
            <div className={styles.container}>
                <h1 className={styles.title}>Contact Us</h1>
                <p>If you have any questions, feedback, or suggestions, feel free to reach out to us. We would love to hear from you!</p>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        style={{ padding: '10px', margin: '10px 0', width: '80%', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        style={{ padding: '10px', margin: '10px 0', width: '80%', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        style={{ padding: '10px', margin: '10px 0', width: '80%', borderRadius: '5px', border: '1px solid #ccc' }}
                    ></textarea>
                    <button
                        type="submit"
                        style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Send Message
                    </button>
                </form>
                <div className={styles.info}>
                    <div className={styles.item}>
                        <FaPhone className={styles.icon} />
                        <span className={styles.text}>+90 123 456 7890</span>
                    </div>
                    <div className={styles.item}>
                        <FaEnvelope className={styles.icon} />
                        <span className={styles.text}>info@tictactoe.com</span>
                    </div>
                    <div className={styles.socials}>
                        <a href="https://facebook.com" className={styles.socialIcon}>
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" className={styles.socialIcon}>
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" className={styles.socialIcon}>
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// const styles = {
    // background: {
    //     backgroundImage: 'url("/images/wallpaper.jpg")',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     minHeight: '100vh',
    //     paddingTop: '70px', 
    //     paddingLeft: '20px',
    //     paddingRight: '20px',
    //     paddingBottom: '20px'
    // },
    // appBarContainer: {
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     zIndex: 1000
    // },
    // container: {
    //     padding: '20px',
    //     textAlign: 'center',
    //     backgroundColor: 'rgba(255, 255, 255, 0.8)',
    //     borderRadius: '8px',
    //     maxWidth: '500px',
    //     margin: 'auto',
    //     marginTop: '10px'
    // },
    // info: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    // },
    // item: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     marginBottom: '15px'
    // },
    // icon: {
    //     marginRight: '10px',
    //     fontSize: '20px'
    // },
    // text: {
    //     fontSize: '18px'
    // },
    // socials: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     marginTop: '20px'
    // },
    // socialIcon: {
    //     fontSize: '24px',
    //     color: '#333',
    //     margin: '0 10px',
    //     textDecoration: 'none'
    // },
    // title: {
    //     textAlign: "center",
    //     fontSize: "2rem",
    //     // marginTop: "1rem"
    // }
// };

export default Contact;