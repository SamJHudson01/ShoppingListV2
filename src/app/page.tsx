import Image from 'next/image'
import styles from './page.module.css'

interface User {
  firstName: string;
  lastName: string;
}
export default function Home() {
  function greet(user: User): string {
    return `Hello, ${user.firstName} ${user.lastName}!`;
  }
  let user: User = {
    firstName: 'sam',
    lastName: 'Hudson'
  };
  console.log(greet(user));

  return (
    <main className={styles.main}>
      <p className="">Text</p>
    </main>
  )
}
