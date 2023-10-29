"use client"
import React from 'react'
import styles from './Toolbox.module.css'
import { useAppDispatch, useAppSelector } from '@/GlobalStore/hooks'
import { handleToolboxClick } from './ToolboxSlice'
import { MENUITEMS } from '@/utils/constants'
import { selectActiveMenu } from '../Menu/MenuSlice'
import { RootState } from '@/GlobalStore/store'

const Toolbox = () => {

  const dispatch = useAppDispatch();
  const pencil = useAppSelector((state:RootState) => state.toolbox[MENUITEMS.PENCIL]);
  const eraser = useAppSelector((state:RootState) => state.toolbox[MENUITEMS.ERASER]);
  const activeMenu = useAppSelector(selectActiveMenu);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = { tool: activeMenu === "PENCIL" ? MENUITEMS.PENCIL : MENUITEMS.ERASER, color: e.target.value, size: activeMenu === "PENCIL" ? pencil.size : eraser.size }
    dispatch(handleToolboxClick(payload))
  }

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = { tool: activeMenu === "PENCIL" ? MENUITEMS.PENCIL : MENUITEMS.ERASER, color: activeMenu === "PENCIL" ? pencil.color : eraser.color, size: +e.target.value }
    dispatch(handleToolboxClick(payload))
  }

  return (
    <div className={styles.toolbox}>
      {
        activeMenu === "PENCIL" &&
        <div className={styles.toolboxItem}>
          <h3 className={styles.toolboxItemText}>Pencil Color</h3>
          <input type="color" className={styles.colorPicker} onChange={handleColorPicker} value={pencil.color} />
        </div>
      }
      <div className={styles.toolboxItem}>
        <h3 className={styles.toolboxItemText}>Pencil Size</h3>
        <input type="range" min={1} max={activeMenu === "ERASER" ? 100 : 10} step={1} className={styles.slider} onChange={handleSize} value={activeMenu === 'ERASER' ? eraser.size : pencil.size} />
      </div>
    </div>
  )
}

export default Toolbox