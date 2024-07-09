import axios from "axios";
import styles from "./styles.module.css"

function Card({tournament, user}){


    const handleJoinTournament = async () => {
        try {

            if (!tournament.players.includes(user._id)) {
                tournament.players.push(user._id);
                alert("Turnuvaya başarılı bir şekilde kayıt oldunuz")
            } else {
                alert("Zaten bu turnuvaya kayıtlısınız")
            }
            
            if(tournament.players.length >= tournament.maxPlayer){
                tournament.ActiveTournament = false
            }

            await axios.post('http://localhost:3001/tournament/join', { tournament }, { withCredentials: true });
            
        } catch (error) {
            console.error('Error joining tournament:', error);
        }
    };

    return(
        <div className={styles.container}>
            <p className={styles.text}>Oyuncu: {tournament.players ?  tournament.players.length : 0} {"/ " + tournament.maxPlayer}</p>
            <p className={styles.text}>Zorluk Seviyesi: {tournament.TournamentType}</p>
            <button className={styles.btn} onClick={handleJoinTournament}>Join</button>
        </div>
    )
}

export default Card