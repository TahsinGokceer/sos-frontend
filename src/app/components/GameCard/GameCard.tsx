import { useEffect, useState } from "react"
import styles from "./styles.module.css"

function GameCard({game}){
    const [result, setResult] = useState(0)

    useEffect(() => {
        switch(game){
            case "Win":
                setResult(1)
                break
            case "Draw":
                setResult(2)
                break
            case "Lose":
                setResult(3)
                break
            default:
                setResult(0)
        }

    }, [])
    return (
        <div className={styles.container}>
            <p className={result === 1 ? styles.win : result === 2 ? styles.draw : styles.lose}>{game}</p>
        </div>
    )
}

export default GameCard