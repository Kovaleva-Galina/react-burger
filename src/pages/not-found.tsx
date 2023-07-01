import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

export function NotFound404() {

  return (
    <div className={styles.wrapper}>
      <div  className={`pt-30 mt-10 ${styles.container}`}>
          <p className="text text_type_main-large">Oops! 404 Error</p>
          <p className="text text_type_main-medium pt-20">The page you requested does not exist</p>
          <p className="text text_type_main-medium">check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
      </div>
    </div>
  );
}
