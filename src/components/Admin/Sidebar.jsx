import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {

  const token = sessionStorage.getItem("access_token")
  if (token == null) window.location.href="/admin"

  const logout = async (e) => {
    e.preventDefault();
    sessionStorage.clear();    
    window.location.href="/admin";
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
              to={`/admin/product`}
            >
              Продукция
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/admin/producttype`}
            >
              Типы продуктов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/admin/productsubtype`}
            >
              Подтипы продуктов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/admin/productitem`}
            >
              Продукты
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/admin/item`}
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
        <a className={styles.link} style={{textDecoration: 'underline'}} onClick={logout} href="/admin">
          Выйти
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
