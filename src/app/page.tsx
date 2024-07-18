"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import AppBar from "./components/appbar";
import { FaCheckCircle, FaMinusCircle, FaTimesCircle } from "react-icons/fa";
// import { TbArrowLoopRight2 } from "react-icons/tb";


function HomePage() {
    const [users, setUsers] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const loginUserControl = async () => {
            const response = await axios.get("http://localhost:3001/page/home", { withCredentials: true })

            if (response.data.loginUser === null) {
                router.push("/auth/login")
            }
        }

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

        loginUserControl()
        fetchUsers();
    }, []);

    // const findGame = async () => {
    //     const response = await axios.get("http://localhost:3001/game/find", { withCredentials: true })
    //     console.log(response.data.user);
    // }

    const renderResultIcon = (result) => {
        switch (result) { // Handle case-insensitive results
            case 'Win':
                return <FaCheckCircle style={{ color: 'rgba(75, 192, 192, 0.8)' }} />;
            case 'Draw':
                return <FaMinusCircle style={{ color: 'rgba(255, 206, 86, 0.8)' }} />;
            case 'Lose':
                return <FaTimesCircle style={{ color: 'rgba(255, 99, 132, 0.8)' }} />;
            default:
                return result; // Display the raw result if not recognized
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading users. Please try again later.</div>;

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <h1 className={styles.title}>Dikkat! Potansiyel liderler!</h1>
                <p>Hemen Oynamaya Başla ve Liderlik Tablosunda Yerini Al!</p>
                <p>Kendinizi kanıtlama ve zirveye tırmanma zamanı geldi! Liderlik tablosunda yerinizi almak için hemen oynamaya başlayın ve rakiplerinizi geride bırakın.</p>
                <p>Ne bekliyorsunuz?</p>
                <ul>
                    <li>Heyecan verici bir mücadeleye dalın ve becerilerinizi test edin.</li>
                    <li>Kendinizi geliştirmek ve yeni zirvelere ulaşmak için fırsat yakalayın.</li>
                    <li>Liderlik tablosunda yerinizi alarak ödüller ve tanınma kazanın.</li>
                </ul>
                {/* <div style={{ textAlign: 'center', lineHeight: '5rem' }}> 
                    <TbArrowLoopRight2 style={{ fontSize: '2rem', display: 'inline-block', verticalAlign: 'middle', transform: 'rotate(90deg)' }} />
                </div>
                <button onClick={findGame} className={styles.btn}>Oyun Ara</button> */}
            </div>

            <div className={styles.rightSection}>                
                <h1 className={styles.title}>Liderlik Tablosu</h1>
                <div className={styles.pointTable}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.td}>User Name</th>
                                <th className={styles.td}>Point</th>
                                <th className={styles.td}>Total Games</th>
                                <th className={styles.td}>Games Won</th>
                                <th className={styles.td}>Last 5 Games</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td className={styles.td}>{user.userName}</td>
                                    <td className={styles.td}>{user.point}</td>
                                    <td className={styles.td}>{user.totalGames}</td>
                                    <td className={styles.td}>{user.gamesWon}</td>
                                    <td className={styles.td}>
                                        {user.games.slice(-5).map((game, j) => (
                                            <span key={j} style={{ marginRight: "5px", display: "inline-block" }}>
                                                {renderResultIcon(game)}
                                            </span>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
    }, [])

    return (
        <>
            <AppBar user={loginUser} />
            <HomePage />
        </>
    );
}