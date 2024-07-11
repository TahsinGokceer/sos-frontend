"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import {useRouter} from "next/navigation";
import styles from "./styles.module.css";
import AppBar from "./components/appbar";

function HomePage() {
    const [users, setUsers] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [socket, setSocket] = useState<any>(null);
    const router = useRouter()

    // useEffect(() => {
    //     // Component mount olduğunda socket bağlantısını oluştur
    //     const newSocket = io("http://localhost:3001", { withCredentials: true });
    //     setSocket(newSocket);

    //     return () => {
    //         // Component unmount olduğunda socket bağlantısını kapat
    //         newSocket.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/user/getAllUser");  // , { userName, email, password }, { withCredentials: true }                
                response.data.allUsers.sort((a: { point: number }, b: { point: number }) => b.point - a.point);
                
                setUsers(response.data.allUsers);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const findGame = async () => {
        const response = await axios.get("http://localhost:3001/game/find", { withCredentials: true })
        // socket.emit("setUserID", response.data.id)
        // socket.on("hi", async (data) => {
        //     console.log(data);
            
        // })
        console.log(response.data.id);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading users. Please try again later.</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>TicTacToe</h1>
                <p className={styles.text}>Hızlı bir oyun arayarak oynamaya başlayabilirsin.</p>
                <button onClick={findGame} className={styles.btn}>Oyun Ara</button>
            </div>
            <div className={styles.pointTable}>
                <h1>Point List</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.td}>User Name</th>
                            <th className={styles.td}>Point</th>
                            <th className={styles.td}>Total Games</th>
                            <th className={styles.td}>Games Won</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i}>
                                <td className={styles.td}>{user.userName}</td>
                                <td className={styles.td}>{user.point}</td>
                                <td className={styles.td}>{user.totalGames}</td>
                                <td className={styles.td}>{user.gamesWon}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>            
        </div>
    );
}

export default function Home() {
    const [loginUser, setLoginUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://localhost:3001/page/home", { withCredentials: true })            
            setLoginUser(response.data.loginUser)           
        }
        
        fetchUser()
        
    },[])    

    return (
        <>                            
            <AppBar user={loginUser}/>
            <HomePage />
        </>
    );
}