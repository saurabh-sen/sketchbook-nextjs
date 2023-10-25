import React from 'react'
import styles from './Menu.module.css'
import Pencil from '@/svgs/Pencil'
import Eraser from '@/svgs/Eraser'
import Undo from '@/svgs/Undo'
import Redo from '@/svgs/Redo'
import Download from '@/svgs/Download'

const Menu = () => {
  return (
    <div className={styles.menu}>
        <span className={styles.menuItem}>
            <Pencil />
        </span>
        <span className={styles.menuItem}>
            <Eraser />
        </span>
        <span className={styles.menuItem}>
            <Undo />
        </span>
        <span className={styles.menuItem}>
            <Redo />
        </span>
        <span className={styles.menuItem}>
            <Download />
        </span>
    </div>
  )
}

export default Menu