"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import AppBar from "./components/appbar";
import { FaCheckCircle, FaMinusCircle, FaTimesCircle } from "react-icons/fa";

function HomePage({ loginUser } : {loginUser: any}) {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const tableRef = useRef<any>(null);
    const headerRef = useRef<any>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://sos-backend-4a2p.onrender.com/user/getAllUser", { withCredentials: true });  // , { userName, email, password }, { withCredentials: true }                
                response.data.allUsers.sort((a: { point: number }, b: { point: number }) => b.point - a.point);

                const usersWithRankings = await Promise.all(
                    response.data.allUsers.map(async (user:any) => {
                        const rankingResponse = await axios.get(`https://sos-backend-4a2p.onrender.com/result/rankings/${user._id}`);
                        return { ...user, ...rankingResponse.data };
                    })
                );

                setUsers(usersWithRankings);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(true);
                setLoading(false);
            }
        };

        
        fetchUsers();
    }, [loginUser]);

    useEffect(() => {
        if (!tableRef.current || !headerRef.current || !loginUser) return;
    
        const userRow = tableRef.current.querySelector(`tr[data-id="${loginUser._id}"]`);
        if (userRow) {
            // Kullanıcı satırının üstündeki satırı bul
            const previousRow = userRow.previousElementSibling;
    
            // Kullanıcı satırı varsa ve üst satır varsa
            if (previousRow) {
                // Sabit başlık yüksekliğini al
                const headerHeight = headerRef.current.offsetHeight;
    
                // Üst satıra kaydır
                previousRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
                // Kaydırma pozisyonunu başlık yüksekliği için ayarla
                tableRef.current.scrollTop -= headerHeight;
            } else {
                // Kullanıcı ilk satırdaysa, kullanıcı satırına kaydır
                userRow.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [users, loginUser]);

    const renderResultIcon = (result:any) => {
        switch (result) { // Handle case-insensitive results
            case 'Win':
                return <FaCheckCircle style={{ color: 'rgba(75, 192, 192, 0.8)' }} />;
            case 'Draw':
                return <FaMinusCircle style={{ color: 'rgba(255, 206, 86, 0.8)' }} />;
            case 'Lose':
                return <FaTimesCircle style={{ color: 'rgba(255, 99, 132, 0.8)' }} />;
            default:
                return result;
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading users. Please try again later.</div>;

    return (
        <div className={styles.container}>                            
            <h1 className={styles.title}>Liderlik Tablosu</h1>
            <div className={styles.pointTable}>
            <div ref={headerRef} className={styles.fixedHeader}></div>  {/*başlığı sabitliyor*/}
                <table className={styles.table} ref={tableRef}>
                    <thead>
                        <tr>
                            <th className={styles.td}>Sıralamanız</th>
                            <th className={styles.td}>User Name</th>
                            <th className={styles.td}>Point</th>
                            <th className={styles.td}>Total Games</th>
                            <th className={styles.td}>Games Won</th>
                            <th className={styles.td}>Last 5 Games</th>
                            <th className={styles.td}>1st</th>
                            <th className={styles.td}>2nd</th>
                            <th className={styles.td}>3rd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={user._id} data-id={user._id} className={user._id === loginUser._id ? styles.highlightRow : ''}>
                                <td className={styles.td}>{i + 1}</td>
                                <td className={styles.td}>{user.userName}</td>
                                <td className={styles.td}>{user.point}</td>
                                <td className={styles.td}>{user.totalGames}</td>
                                <td className={styles.td}>{user.gamesWon}</td>
                                <td className={styles.td}>
                                    {user.games.slice(-5).map((game:any, j:any) => (
                                        <span key={j} style={{ marginRight: "5px", display: "inline-block" }}>
                                            {renderResultIcon(game)}
                                        </span>
                                    ))}
                                </td>
                                <td className={styles.td}>{user.firstPlace}</td>
                                <td className={styles.td}>{user.secondPlace}</td>
                                <td className={styles.td}>{user.thirdPlace}</td>
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
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("https://sos-backend-4a2p.onrender.com/page/home", { withCredentials: true })
            console.log(response.data);
            
            if (response.data.loginUser === null) {
                router.push("/auth/login")
            }
            
            setLoginUser(response.data.loginUser)
        }

        fetchUser()
    }, [])

    return (
        <>
            <AppBar user={loginUser} />
            {loginUser && <HomePage loginUser={loginUser} />}            
        </>
    );
}