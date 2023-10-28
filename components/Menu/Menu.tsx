"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'

import { useAppDispatch } from '@/GlobalStore/hooks'
import { handleActiveMenuClick, handleActionMenuClick, selectActiveMenu } from './MenuSlice'
import ClearAll from '@/svgs/ClearAll'
import styles from './Menu.module.css'
import Pencil from '@/svgs/Pencil'
import Eraser from '@/svgs/Eraser'
import Undo from '@/svgs/Undo'
import Redo from '@/svgs/Redo'
import Download from '@/svgs/Download'
import { MENUITEMS } from '@/utils/constants'

const Menu = () => {

    const dispatch = useAppDispatch();

    const activeMenu = useSelector(selectActiveMenu);

    const handleActiveMenu = (menuItem: string) => {
        dispatch(handleActiveMenuClick(menuItem));
    }

    const handleActionMenu = (menuItem: string) => {
        dispatch(handleActionMenuClick(menuItem));
    }

    return (
        <div className={styles.menu}>
            <span className={cn(styles.menuItem, {[styles.active]: activeMenu === MENUITEMS.PENCIL})} onClick={() => handleActiveMenu(MENUITEMS.PENCIL)}>
                <Pencil />
            </span>
            <span className={cn(styles.menuItem, {[styles.active]: activeMenu === MENUITEMS.ERASER})} onClick={() => handleActiveMenu(MENUITEMS.ERASER)}>
                <Eraser />
            </span>
            <span className={styles.menuItem} onClick={() => handleActionMenu(MENUITEMS.UNDO)}>
                <Undo />
            </span>
            <span className={styles.menuItem} onClick={() => handleActionMenu(MENUITEMS.REDO)}>
                <Redo />
            </span>
            <span className={styles.menuItem} onClick={() => handleActionMenu(MENUITEMS.DOWNLOAD)}>
                <Download />
            </span>
            <span className={styles.menuItem} onClick={() => handleActionMenu(MENUITEMS.CLEARALL)}>
                <ClearAll />
            </span>
        </div>
    )
}

export default Menu