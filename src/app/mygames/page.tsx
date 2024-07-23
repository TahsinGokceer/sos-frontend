"use client"
import { useState, useEffect } from "react"
import axios from "axios";
import Link from "next/link"
import AppBar from "../components/appbar"
import GameCard from "../components/GameCard/GameCard";
import BarChart from "../components/BarChart/barChart";
import PieChart from "../components/PieChart/pieChart";
import styles from "./styles.module.css"

function Mygames() {
    const [loginUser, setLoginUser] = useState<any>();
    const [lastGames, setLastGames] = useState<any[]>([])
    const [tournaments, setTournaments] = useState<any[]>([]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("https://sos-backend-4a2p.onrender.com/page/home", { withCredentials: true });
                setLoginUser(response.data.loginUser);
                setLastGames(response.data.loginUser.games.slice(-5).reverse());

                const userId = response.data.loginUser._id; // Kullanıcı ID'sini alın                
                const tournamentResponse = await axios.get(`https://sos-backend-4a2p.onrender.com/tournament/userTournaments/${userId}`, { withCredentials: true });
                setTournaments(tournamentResponse.data.userTournaments);
            } catch (error) {
                console.error("Error fetching user or tournaments:", error);
            }
        }

        fetchUser()
    }, [])

    return (
        <div>
            <AppBar user={loginUser} />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{loginUser && loginUser.userName}</h1>
                    <p>Lider tablolarında en üst sıralara tırmanmak için olan mücadelendeki tüm istatistiklerin burada! </p>
                    <p>İstatistiklerini daha da geliştirmek ister misin? </p>
                    <p>Farklı zorluk seviyelerinde kendini test et ve skorunu artırmak için mücadeleye katıl! </p>
                    <p>Ayrıca, yaklaşan turnuvalarda yer alarak en iyiler arasında olma şansını daha da artırabilirsin. </p>
                    <p>Hadi, şimdi oyuna geri dön ve başarını katla! </p>
                    <h4 className={styles.minTitle}>İstatistiklerin</h4>
                    {loginUser && lastGames.length > 0 ? (
                        <>                            
                            <div className={styles.chartsContainer}>
                                <BarChart data={{
                                    gamesWon: loginUser.gamesWon,
                                    gamesDraw: loginUser.gamesDraw,
                                    gamesLost: loginUser.gamesLost,
                                }} />
                                <PieChart data={{
                                    gamesWon: loginUser.gamesWon,
                                    totalGames: loginUser.totalGames,
                                }} />
                            </div>
                        </>
                    ) : (                        
                        <p className={styles.noGamesMessage}>Herhangi bir oyun oynamadığınız için henüz istatiğiniz yok.</p>
                    )}
                    <h4 className={styles.minTitle}>Son 5 oyun durumun:</h4>
                    <div className={styles.gamesWrapper}>
                        {lastGames.length === 0 ? (
                            <p className={styles.noGamesMessage}>Herhangi bir oyun oynamadınız. Uygulamamızı ziyaret ederek hemen oynamaya başlayabilirsiniz.</p>
                        ) : (
                            <div className={styles.gamesContainer}>
                                {lastGames.map(lastGame => <GameCard key={lastGame._id} game={lastGame} />)}
                            </div>
                        )}
                    </div>
                    <h4 className={styles.minTitle}>Katıldığın Turnuvalar</h4>
                    <div className={styles.tournamentsContainer}>
                        {tournaments.length === 0 ? (
                            <p>Herhangi bir turnuvaya katılmadınız.</p>
                        ) : (
                            <table className={styles.tournamentTable}>
                                <thead>
                                    <tr>
                                        <th>Turnuva Tipi</th>
                                        <th>Oyuncu Sayısı</th>
                                        <th>Aktiflik</th>
                                        <th>Sıralamanız</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tournaments.map(tournament => (
                                        <tr key={tournament._id}>
                                            <td>{tournament.TournamentType}</td>
                                            <td>{tournament.maxPlayer}</td>
                                            <td>{tournament.ActiveTournament ? "Devam ediyor." : "Sona erdi."}</td>
                                            <td>{tournament.ranking !== null ? tournament.ranking : "Sıralama yok."}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mygames