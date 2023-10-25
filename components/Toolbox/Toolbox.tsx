"use client"
import React from 'react'
import styles from './Toolbox.module.css'

const Toolbox = () => {

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <div className={styles.toolbox}>
        <div className={styles.toolboxItem}>
            <h3 className={styles.toolboxItemText}>Pencil Color</h3>
            <input type="color" className={styles.colorPicker} onChange={handleColorPicker} />
        </div>
        <div className={styles.toolboxItem}>
          <h3 className={styles.toolboxItemText}>Pencil Size</h3>
            <input type="range" min={1} max={10} step={1} className={styles.slider} onChange={handleSize} />
        </div>
    </div>
  )
}

export default Toolbox