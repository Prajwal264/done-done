import { NavLink } from 'react-router-dom';
import styles from './home.module.scss';
import heroBanner from '../../assets/hero-banner.png';
interface IHomepageProps { }

const Homepage: React.FC<IHomepageProps> = () => {

  return (
    <div className={styles.home}>
      <div className={styles.introSection}>
        <h2>Organize all your tasks in one place</h2>
        <NavLink to="/signup" className={styles.button}>
          Get Started
        </NavLink>
      </div>
      <img className={styles.heroBanner} src={heroBanner} alt="hero-banner" />
    </div>
  )
};
export default Homepage;
