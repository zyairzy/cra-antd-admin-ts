import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppGlobalState {
  locale: string;
  collapsed: boolean; // 菜单收纳状态
}

const initState: AppGlobalState = {
  locale: localStorage.getItem('locale') || 'zh',
  collapsed: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState: initState,
  reducers: {
    setGlobalLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setGlobalLocale, setCollapsed } = globalSlice.actions;

export default globalSlice.reducer;
