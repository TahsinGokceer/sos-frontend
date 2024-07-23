"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "../components/appbar"

function About() {
    const [loginUser, setLoginUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("https://sos-backend-4a2p.onrender.com/page/home", { withCredentials: true })
            setLoginUser(response.data.loginUser)
        }

        fetchUser()
    }, [])

    return (
        <div style={styles.background}>
            <div style={styles.appBarContainer}>
                <AppBar user={loginUser} />
            </div>          
            <div style={styles.container}>
                <h1 style={styles.title}>About Us</h1>
                <p style={styles.text}>Welcome to our multiplayer TicTacToe game! Our goal is to bring the classic TicTacToe game to a modern platform, allowing you to enjoy it with friends or players from around the world.</p>
                <p style={styles.text}>Here are some features of our game:</p>
                <ul style={styles.list}>
                    <li style={styles.listItem}>-Play with friends or random opponents in real-time.</li>
                    <li style={styles.listItem}>-Simple and intuitive user interface.</li>
                    <li style={styles.listItem}>-Track your scores and see your ranking.</li>
                    <li style={styles.listItem}>-Join tournaments.</li>
                </ul>
                <p style={styles.text}>We hope you enjoy playing our game as much as we enjoyed creating it. Happy playing!</p>
            </div>            
        </div>
    )
}

const styles = {
    background: {
        backgroundImage: 'url("/images/wallpaper.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '70px', // AppBar height + padding
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px'
    },
    appBarContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000
    },    
    container: {
        padding: '40px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        maxWidth: '700px',
        margin: '50px auto 0 auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '20px',
        color: '#333',
    },
    text: {
        fontSize: '1.2em',
        lineHeight: '1.6',
        color: '#555',
        marginBottom: '20px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        fontSize: '1.2em',
        marginBottom: '10px',
        color: '#555',
    }
};

export default About;