import {
    FaFacebookF,
    FaInstagram,
    FaLinkedin,
    FaTiktok,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.socials}>
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                    aria-label="Facebook"
                >
                    <FaFacebookF />
                </a>

                <a
                    href="https://x.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                    aria-label="X"
                >
                    <FaXTwitter />
                </a>

                <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                    aria-label="TikTok"
                >
                    <FaTiktok />
                </a>

                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>

                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.link}
                    aria-label="LinkedIn"
                >
                    <FaLinkedin />
                </a>
            </div>

            <span className={styles.copy}>
                © {new Date().getFullYear()} MyApp
            </span>
        </footer>
    );
};