  
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../Nav/Nav.module.css';
import { useCart } from '../../hooks/use-cart.js';

const Nav = () => {

  const { subtotal } = useCart();
  return (
    <nav className={styles.nav}>
      <Link href="/"><a>
          <p className={styles.navTitle}>
            T-Shirt Hub
          </p>
        </a>
      </Link>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a><FaShoppingCart /> Rs.{subtotal?.toFixed(2)}</a>
        </Link>
      </p>
    </nav>
  )
}

export default Nav;