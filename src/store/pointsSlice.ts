import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Point {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface PointsState {
  points: Point[];
}

const initialState: PointsState = {
  points: [],
};

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<Point>) => {
      state.points.push(action.payload);
    },
    updatePoint: (state, action: PayloadAction<Point>) => {
      const index = state.points.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.points[index] = action.payload;
    },
    deletePoint: (state, action: PayloadAction<string>) => {
      state.points = state.points.filter(p => p.id !== action.payload);
    },
    clearPoints: state => {
      state.points = [];
    },
  },
});

export const { addPoint, updatePoint, deletePoint, clearPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
