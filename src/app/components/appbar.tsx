import Link from "next/link"
import Image from "next/image";
import axios from "axios";
import { IoIosArrowDown, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiSolidChess } from "react-icons/bi";
import { useRouter } from "next/navigation";
import styles from "./appbar.module.css";
import { useState, useRef, useEffect } from "react";

const AppBar = ({ user }: { user: any }) => {
    const router = useRouter()
    const [isShow, setIsShow] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = async (e:any) => {
        e.preventDefault()
        await axios.get("https://sos-backend-4a2p.onrender.com/user/logout", { withCredentials: true })        
        router.push("/auth/login")
    }

    const handleIsShow = () => {
        setIsShow(!isShow)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
            setIsShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image src="/images/logo.png" alt="Logo" width={40} height={40} className={styles.logo} />
                <h1 className={styles.title}>TicTacToe</h1>
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
                    {/* <li>
                        <Link href="/tournaments">Tournaments</Link>
                    </li> */}
                </ul>
            </div>
            <div className={styles.right}>
                <button className={styles.btn} onClick={handleIsShow}>{user && user.userName} {<IoIosArrowDown className={styles.icon} />}</button>
                {
                    isShow && (
                        <div className={styles.menu} ref={menuRef}>
                            <ul className={styles.menuList}>
                                <li>
                                    <Link className={styles.link} href="/profile">{<CgProfile className={styles.icon2} />} Profile</Link>
                                </li>
                                <li>
                                    <Link className={styles.link} href="/mygames">{<BiSolidChess className={styles.icon2} />} My Games</Link>
                                </li>
                                <li>
                                    <Link className={styles.link} onClick={e => handleClick(e)} href="/auth/login">{<IoIosLogOut className={styles.icon2} />} Logout</Link>
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