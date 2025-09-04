import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MinimalistDashboard } from "../components/MinimalistLayout";
import { addPoint, updatePoint } from "../store/pointsSlice";
import type { AppDispatch } from "../store";

// import { DarkModeDashboard } from "../components/layouts/dark-mode-dashboard"
// import { CardBasedDashboard } from "../components/layouts/card-based-dashboard"
// import { SplitViewDashboard } from "../components/layouts/split-view-dashboard"
// import { SidePanelDashboard } from "../components/layouts/side-panel-dashboard"

export interface Point {
  id: string;
  name: string;
  x: number;
  y: number;
}

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const [points, setPoints] = useState<Point[]>([
    { id: "1", name: "Point 1", x: 100, y: 100 },
  ]);
  const [nextId, setNextId] = useState(1);
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<string>("minimalist");

  // Temporary state for adding a new point (from dialog/form)
  const [newPoint, setNewPoint] = useState<{ name: string; x: number; y: number }>({
    name: "",
    x: 0,
    y: 0,
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState<Point | null>(null);

  const generateRandomName = (): string => {
    const adjectives = [
      "Alpha","Beta","Gamma","Delta","Epsilon","Zeta","Eta","Theta","Iota","Kappa"
    ];
    const nouns = [
      "Point","Node","Vertex","Marker","Spot","Location","Position","Coordinate","Pin","Dot"
    ];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };

  const handleAddPoint = () => {
    // const pointToAdd: Point = {
    //   id: nextId.toString(),
    //   name: newPoint.name || generateRandomName(),
    //   x: newPoint.x,
    //   y: newPoint.y,
    // };
    // console.log("[v0] Adding point from table:", pointToAdd);
    // setPoints([...points, pointToAdd]);
     if (editingPoint) {
      dispatch(updatePoint({ id: editingPoint.id, ...newPoint }));
    } else {
      dispatch(addPoint(newPoint));
    }
    setNextId(nextId + 1);
    setAddDialogOpen(false);
    setNewPoint({ name: "", x: 0, y: 0 });
  };

  const layouts = {
    minimalist: MinimalistDashboard,
    // dark: DarkModeDashboard,
    // card: CardBasedDashboard,
    // split: SplitViewDashboard,
    // panel: SidePanelDashboard,
  };

  const SelectedLayout =
    layouts[selectedLayout as keyof typeof layouts] || MinimalistDashboard;

  return (
    <SelectedLayout
      points={points}
      setPoints={setPoints}
      hoveredPointId={hoveredPointId}
      setHoveredPointId={setHoveredPointId}
      selectedLayout={selectedLayout}
      setSelectedLayout={setSelectedLayout}
      handleAddPoint={handleAddPoint}
      newPoint={newPoint}
      setNewPoint={setNewPoint}
      addDialogOpen={addDialogOpen}
      setAddDialogOpen={setAddDialogOpen}
      editingPoint={editingPoint}
      setEditingPoint={setEditingPoint}
    />
  );
}
