"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "../components/appbar"

function Contact(){
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

      
            <h1>Contact Us:</h1>
            <p>If you have any questions, feedback, or suggestions, feel free to reach out to us. We'd love to hear from you!</p>
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
        </div>
    );
};

export default Contact;
