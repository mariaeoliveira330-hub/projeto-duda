import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { FaGaugeHigh } from "react-icons/fa6";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Header.module.css";

export const Header = () => {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className={styles.header}>
            <strong className={styles.brand}>
                <FaGaugeHigh size={20} />
                MyApp
            </strong>

            <NavLink
                to="/home"
                className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                }
            >
                Home
            </NavLink>

            <NavLink
                to="/motos"
                className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                }
            >
                Motos
            </NavLink>

            <NavLink
                to="/veiculos"
                className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                }
            >
                Veículos
            </NavLink>

            <div className={styles.actions}>
                {user && (
                    <div className={styles.userInfo}>
                        <FaUserCircle
                            size={20}
                            className={styles.userIcon}
                        />
                        <span className={styles.userName}>
                            {user.name}
                        </span>
                    </div>
                )}

                <button
                    className={styles.themeToggle}
                    onClick={() => setDarkMode((prev) => !prev)}
                    aria-label={
                        darkMode
                            ? "Ativar tema claro"
                            : "Ativar tema escuro"
                    }
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>

                <button
                    className={styles.logout}
                    onClick={handleLogout}
                >
                    Sair
                </button>
            </div>
        </header>
    );
};