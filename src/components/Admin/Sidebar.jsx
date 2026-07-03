import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import config from "../../config/config.json";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {

  useEffect(() => {
    // The auth token lives in an HttpOnly cookie and is not visible to JS,
    // so verify the session against the server instead.
    axios
      .get(`${config.apiBaseUrl}/auth/me`, { withCredentials: true })
      .catch(() => { window.location.href = "/"; });
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiBaseUrl}/auth/logout`, {}, { withCredentials: true });
    } finally {
      window.location.href = "/";
    }
  }

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>Категории</div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/product`}
            >
              Продукция
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/producttype`}
            >
              Типы продуктов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/productsubtype`}
            >
              Подтипы продуктов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/productitem`}
            >
              Продукты
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/item`}
            >
              Категории продуктов
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.footer}>
        <a className={styles.link} href="/">
          Помощь
        </a>
        <a className={styles.link} style={{textDecoration: 'underline'}} onClick={logout} href="/">
          Выйти
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
