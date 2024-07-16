"use client"
import { useState, useEffect } from "react"
import axios from "axios";
import Link from "next/link"
import AppBar from "../components/appbar"
import GameCard from "../components/GameCard/gameCard";
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
                    <div className={styles.infoLabel}>
                        <p>Total Games: {loginUser && loginUser.totalGames}</p>
                        <p>Win: {loginUser && loginUser.gamesWon}</p>
                        <p>Draw: {loginUser && loginUser.totalGames - (loginUser.gamesWon + loginUser.gamesLost)}</p>
                        <p>Lost: {loginUser && loginUser.gamesLost}</p>
                        <p>Point: {loginUser && loginUser.point}</p>
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