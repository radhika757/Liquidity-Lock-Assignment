import { Box, IconButton, Typography } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { D3Chart } from "./D3Chart"
import { PointsTable } from "./PointsTable"


interface Point {
  id: string
  name: string
  x: number
  y: number
}

interface MinimalistDashboardProps {
  points: Point[]
  setPoints: (points: Point[]) => void
  hoveredPointId: string | null
  setHoveredPointId: (id: string | null) => void
  onLogout?: () => void
  selectedLayout: string
  setSelectedLayout: (layout: string) => void,
  handleAddPoint: () => void,
  newPoint: { name: string; x: number; y: number }
  setNewPoint: (point: { name: string; x: number; y: number }) => void
  addDialogOpen: boolean
  setAddDialogOpen: (open: boolean) => void
}

export function MinimalistDashboard({
  points,
  setPoints,
  hoveredPointId,
  setHoveredPointId,
  onLogout,
  handleAddPoint,
  setAddDialogOpen,
  addDialogOpen,
  newPoint,
  setNewPoint
}: MinimalistDashboardProps) {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Box
        width={64}
        bgcolor="background.paper"
        borderRight="1px solid"
        borderColor="divider"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={3}
      >
        <Box
          p={1}
          bgcolor="primary.main"
          borderRadius={2}
          color="primary.contrastText"
          fontWeight="bold"
        >
          📊
        </Box>
        <IconButton>
          <SettingsIcon color="action" />
        </IconButton>
        <Box flexGrow={1} />
        <IconButton onClick={onLogout}>
          <LogoutIcon color="error" />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box flex={1} p={6}>
        <Box maxWidth="1200px" mx="auto">
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={300}>
              Graph Studio
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto">
              Create and manipulate data points with precision. Click to add, drag to move, edit to refine.
            </Typography>
          </Box>

          {/* D3 Chart */}
          <D3Chart
            points={points}
            setPoints={setPoints}
            hoveredPointId={hoveredPointId}
            onPointHover={setHoveredPointId}
          />

          {/* Data Table */}
          <Box mt={6}>
            <PointsTable
              points={points}
              setPoints={setPoints}
              hoveredPointId={hoveredPointId}
              onPointHover={setHoveredPointId}
              handleAddPoint={handleAddPoint}
              addDialogOpen={addDialogOpen}
              setAddDialogOpen={setAddDialogOpen}
              newPoint={newPoint}
              setNewPoint={setNewPoint}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
