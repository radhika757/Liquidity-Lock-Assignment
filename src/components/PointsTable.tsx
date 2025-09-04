import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";


interface Point {
  id: string
  name: string
  x: number
  y: number
}

interface PointsTableProps {
  points: Point[]
  setPoints: (points: Point[]) => void
  hoveredPointId: string | null
  onPointHover: (id: string | null) => void
}

export function PointsTable({
  points,
  setPoints,
  hoveredPointId,
  onPointHover,
}: PointsTableProps) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "x", headerName: "X", width: 120, editable: true, type: "number" },
    { field: "y", headerName: "Y", width: 120, editable: true, type: "number" },
  ]

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={points}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => onPointHover(params.id.toString())}
        processRowUpdate={(newRow) => {
          const updated = points.map((p) =>
            p.id === newRow.id ? { ...newRow } : p
          )
          setPoints(updated)
          return newRow
        }}
        sx={{
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
          },
          ...(hoveredPointId && {
            [`& .MuiDataGrid-row[data-id="${hoveredPointId}"]`]: {
              backgroundColor: "rgba(34,197,94,0.2)", // light green highlight
            },
          }),
        }}
      />
    </div>
  )
}
