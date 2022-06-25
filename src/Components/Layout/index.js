import { useContext } from "react";

import { IcLogout } from "../../Assets";
import { AuthContext } from "../../main";

import styles from "./layoutStyles.module.css";

export const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label>{user.value.email}</label>
        <img
          onClick={() => logout()}
          alt="LogOut"
          src={IcLogout}
          className={styles.logout}
        />
      </div>
      {children}
    </div>
  );
};
