import { useState } from "react"
import { MinimalistDashboard } from "../components/layouts/minimalist-dashboard"
// import { DarkModeDashboard } from "../components/layouts/dark-mode-dashboard"
// import { CardBasedDashboard } from "../components/layouts/card-based-dashboard"
// import { SplitViewDashboard } from "../components/layouts/split-view-dashboard"
// import { SidePanelDashboard } from "../components/layouts/side-panel-dashboard"

export interface Point {
  id: string
  name: string
  x: number
  y: number
}

export function Dashboard() {
  const [points, setPoints] = useState<Point[]>([])
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null)
  const [selectedLayout, setSelectedLayout] = useState<string>("minimalist")

  const layouts = {
    minimalist: MinimalistDashboard,
    // dark: DarkModeDashboard,
    // card: CardBasedDashboard,
    // split: SplitViewDashboard,
    // panel: SidePanelDashboard,
  }

  const SelectedLayout = layouts[selectedLayout as keyof typeof layouts] || MinimalistDashboard

  return (
    <SelectedLayout
      points={points}
      setPoints={setPoints}
      hoveredPointId={hoveredPointId}
      setHoveredPointId={setHoveredPointId}
      selectedLayout={selectedLayout}
      setSelectedLayout={setSelectedLayout}
    />
  )
}
