"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "../components/appbar"

function About(){
    const [loginUser, setLoginUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://localhost:3001/page/home", { withCredentials: true })
            setLoginUser(response.data.loginUser)           
        }
        
        fetchUser()
    },[])

    return (
        <div>
            <AppBar user={loginUser}/>
            
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h1>About Us:</h1>
            <p>Welcome to our multiplayer TicTacToe game! Our goal is to bring the classic TicTacToe game to a modern platform, allowing you to enjoy it with friends or players from around the world.</p>
            <p>Here are some features of our game:</p>
            <ul style={{ textAlign: 'middle' }}>
                <li>-Play with friends or random opponents in real-time.</li>
                <li>-Simple and intuitive user interface.</li>
                <li>-Track your scores and see your ranking.</li>
                <li>-Join tournaments.</li>
            </ul>
            <p>We hope you enjoy playing our game as much as we enjoyed creating it. Happy playing!</p>
        </div>
            
        </div>
    )
}

export default About