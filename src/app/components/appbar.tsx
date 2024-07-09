import Link from "next/link"
import axios from "axios";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiSolidChess } from "react-icons/bi";
import { useRouter } from "next/navigation";
import styles from "./appbar.module.css";
import { useState } from "react";


const AppBar = ({ user }) => {
    const router = useRouter()
    const [isShow, setIsShow] = useState(false)

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await axios.get("http://localhost:3001/user/logout", { withCredentials: true })
        router.push("/auth/login")
    }

    const handleIsShow = () => {
        setIsShow(!isShow)
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h1 className={styles.title}>TicTacToe Game</h1>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About Us</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link href="/tournaments">Tournaments</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.right}>
                <button className={styles.btn} onClick={handleIsShow}>{user && user.userName} {<IoIosArrowDown className={styles.icon} />}</button>
                {
                    isShow && (
                        <div className={styles.menu}>
                            <ul className={styles.menuList}>
                                <li>
                                    <Link className={styles.link} href="/profile">{<CgProfile className={styles.icon2}/>} Profile</Link>
                                </li>
                                <li>
                                    <Link className={styles.link} href="/mygames">{<BiSolidChess className={styles.icon2}/>} My Games</Link>
                                </li>
                                <li>
                                    <Link className={styles.link} onClick={handleClick} href="/auth/login">{<IoIosLogOut className={styles.icon2}/>} Logout</Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AppBar;