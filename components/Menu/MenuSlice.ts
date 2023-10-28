import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../GlobalStore/store'
import { MENUITEMS } from '@/utils/constants'
import { type } from 'os'

type TActiveMenu = typeof MENUITEMS.PENCIL | typeof MENUITEMS.ERASER;

// Define a type for the slice state
interface MenuState {
  activeMenu: TActiveMenu;
  actionMenu: string | null;
}

// Define the initial state using that type
const initialState: MenuState = {
  activeMenu: MENUITEMS.PENCIL,
  actionMenu: null,
}

export const menuSlice = createSlice({
  name: 'menu',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    handleActiveMenuClick: (state, action: PayloadAction<TActiveMenu>) => {
        state.activeMenu = action.payload;
    },
    handleActionMenuClick: (state, action: PayloadAction<string>) => {
        state.actionMenu = action.payload;
    },
  },
})

export const { handleActiveMenuClick, handleActionMenuClick } = menuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveMenu = (state: RootState) => state.menu.activeMenu
export const selectActionMenu = (state: RootState) => state.menu.actionMenu

export default menuSlice.reducer