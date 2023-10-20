import { Link } from 'react-router-dom';
import logo2 from '../../assets/logo2.png';
import style from './style.module.css';

function Header() {
  return (
    <header>
      <section className={ style.headerSection }>
        <Link to="/">
          <img className={ style.headerLogo } src={ logo2 } alt="logo" />
        </Link>
      </section>
    </header>
  );
}

export default Header;
