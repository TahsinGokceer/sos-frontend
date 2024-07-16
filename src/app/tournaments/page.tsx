"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '../components/appbar';
import Card from '../components/TournamentCard/card';
import styles from "./styles.module.css"

const TournamentsPage = () => {
    const [activeTournament, setActiveTournament] = useState([]);
    const [loginUser, setLoginUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("http://localhost:3001/page/home", { withCredentials: true })
            setLoginUser(response.data.loginUser)
        }

        getActiveTournaments();
        fetchUser()
    }, [])

    const getActiveTournaments = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tournament/find', { withCredentials: true });
            console.log(response.data.activeTournaments);
            setActiveTournament(response.data.activeTournaments);

        } catch (error) {
            console.error('Error fetching tournaments:', error);
        }
    };

    /*
    const createTournament = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:3001/tournament/create")
    }
    */

    return (
        <div>
            <AppBar user={loginUser} />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Tournaments</h1>
                    <p className={styles.text}>Hemen bir turnuvaya katıl ve oynamaya başla</p>

                    <div className={styles.cards}>
                        {
                            activeTournament ? (
                                activeTournament.map(tournament => (
                                    <Card user={loginUser} tournament={tournament} />
                                ))
                            ) : (<><p>Aktif turnuva yok</p></>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TournamentsPage;