"use client"
import { useState, useEffect } from "react"
import axios from "axios";
import Link from "next/link"
import AppBar from "../components/appbar"
import GameCard from "../components/GameCard/GameCard";
import styles from "./styles.module.css"


function Mygames() {
    const [loginUser, setLoginUser] = useState();
    const [lastGames, setLastGames] = useState([])

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://localhost:3001/page/home", { withCredentials: true })
            console.log(response.data.loginUser);
            setLoginUser(response.data.loginUser)
            setLastGames(response.data.loginUser.games.slice(-5).reverse())
        }

        fetchUser()
    }, [])

    return (
        <div>
            <AppBar user={loginUser} />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{loginUser && loginUser.userName}</h1>
                    <p>
                        Lider tablolarında en üst sıralara tırmanmak için olan mücadelendeki tüm istatistiklerin burada! <br />
                        İstatistiklerini daha da geliştirmek ister misin? <br />
                        Farklı zorluk seviyelerinde kendini test et ve skorunu artırmak için mücadeleye katıl! <br />
                        Ayrıca, yaklaşan turnuvalarda yer alarak en iyiler arasında olma şansını daha da artırabilirsin. <br />
                        Hadi, şimdi oyuna geri dön ve başarını katla!
                    </p>
                    <div className={styles.infoLabel}>
                        <p>Total Games <br /> {loginUser && loginUser.totalGames}</p>
                        <p>Win <br /> {loginUser && loginUser.gamesWon}</p>
                        <p>Draw <br /> {loginUser && loginUser.totalGames - (loginUser.gamesWon + loginUser.gamesLost)}</p>
                        <p>Lost <br /> {loginUser && loginUser.gamesLost}</p>
                        <p>Point <br /> {loginUser && loginUser.point}</p>
                    </div>
                    <h4 className={styles.minTitle}>Son 5 oyun durumun:</h4>
                </div>

                <div className={styles.gamesContainer}>
                    {
                        lastGames.length == 0 ? (<p>Herhangi bir oyun oynamadınız. Hemen <Link className={styles.link} href="/">ana sayfaya</Link> dönüp bir oyun oynayabilirsiniz</p>) : (lastGames.map(lastGame => <GameCard game={lastGame} />))
                    }
                </div>
            </div>


        </div>
    )
}

export default Mygames