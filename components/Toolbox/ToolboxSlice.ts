import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../GlobalStore/store";
import { IMenuItems, MENUITEMS } from "@/utils/constants";

interface IToolboxState {
  [key: string]:
    | {
        color: string;
        size: number;
      }
    | {
        color: string;
        size: number;
      };
}

interface IActionButton {
  tool: typeof MENUITEMS.PENCIL | typeof MENUITEMS.ERASER;
  color: string;
  size: number;
}

const initialState: IToolboxState = {
    [MENUITEMS.PENCIL]: {
        color: '#ff0000',
        size: 3
    },
    [MENUITEMS.ERASER]: {
        color: '#ffffff',
        size: 10
    },
};

const toolboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    handleToolboxClick: (state, action: PayloadAction<IActionButton>) => {
      const { tool, color, size } = action.payload;
      state[tool] = { color, size };
    },
  },
});

export const { handleToolboxClick } = toolboxSlice.actions;

export const selectPencil = (state: RootState) => state.toolbox[MENUITEMS.PENCIL];
export const selectEraser = (state: RootState) => state.toolbox[MENUITEMS.ERASER];

export default toolboxSlice.reducer;