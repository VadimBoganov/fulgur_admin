import Product from "./Product";
import Sidebar from "./Sidebar";
import styles from './Admin.module.scss'

const Admin = () => {
  return (
    <div className={styles.admin}>
      <Sidebar />
      <Product />
    </div>
  );
};

export default Admin;
