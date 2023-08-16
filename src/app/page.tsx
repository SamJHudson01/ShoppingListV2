import Image from 'next/image'
import styles from './page.module.css'
import ShoppingList from '../components/ShoppingList/ShoppingList'


export default function Home() {
  return (
    <main className={styles.main}>
      <ShoppingList />
    </main>
  )
}
