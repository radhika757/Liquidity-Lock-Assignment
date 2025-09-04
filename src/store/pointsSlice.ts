// store/pointsSlice.ts
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
  nextId: number;
}

const initialState: PointsState = {
  points: [{ id: "1", name: "Point 1", x: 100, y: 100 }],
  nextId: 2,
};

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    addPoint: (state, action: PayloadAction<{ name?: string; x: number; y: number }>) => {
      const newPoint: Point = {
        id: state.nextId.toString(),
        name: action.payload.name || `Point ${state.nextId}`,
        x: action.payload.x,
        y: action.payload.y,
      };
      state.points.push(newPoint);
      state.nextId += 1;
    },
    updatePoint: (state, action: PayloadAction<Point>) => {
      state.points = state.points.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    deletePoint: (state, action: PayloadAction<string>) => {
      state.points = state.points.filter((p) => p.id !== action.payload);
    },
    clearPoints: (state) => {
      state.points = [];
      state.nextId = 1;
    },
  },
});

export const { addPoint, updatePoint, deletePoint, clearPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
