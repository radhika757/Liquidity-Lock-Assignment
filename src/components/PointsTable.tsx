import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

interface Point {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface PointsTableProps {
  points: Point[];
  setPoints: (points: Point[]) => void;
  hoveredPointId: string | null;
  onPointHover: (id: string | null) => void;
  handleAddPoint: () => void;
  addDialogOpen: boolean;
  setAddDialogOpen: (open: boolean) => void;
  setNewPoint: (point: { name: string; x: number; y: number }) => void;
  newPoint: { name: string; x: number; y: number };
}

export function PointsTable({
  points,
  setPoints,
  hoveredPointId,
  onPointHover,
  handleAddPoint,
  addDialogOpen,
  setAddDialogOpen,
  setNewPoint,
  newPoint,
}: PointsTableProps) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, editable: false },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "x", headerName: "X", width: 120, editable: true, type: "number" },
    { field: "y", headerName: "Y", width: 120, editable: true, type: "number" },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          display="flex"
          gap={1}
          width="100%"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {/* Edit button */}
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setNewPoint({
                name: params.row.name,
                x: params.row.x,
                y: params.row.y,
              });
              setAddDialogOpen(true);
            }}
          >
            Edit
          </Button>

          {/* Delete button */}
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              const updatedPoints = points.filter((p) => p.id !== params.id);
              setPoints(updatedPoints);
              if (hoveredPointId === params.id) onPointHover(null);
            }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: 800 }}>
      <Box className="w-full">
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Data Points</Typography>

          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddDialogOpen(true)}
            >
              + Add Point
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => setPoints([])}
            >
              Clear All
            </Button>
          </Box>
        </Box>

        {/* DataGrid */}
        <DataGrid
          rows={points}
          columns={columns}
          getRowId={(row) => row.id}
          onRowClick={(params) => onPointHover(params.id.toString())}
          processRowUpdate={(newRow) => {
            const updated = points.map((p) =>
              p.id === newRow.id ? { ...newRow } : p
            );
            setPoints(updated);
            return newRow;
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
      </Box>

      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          },
        }}
      >
        <DialogTitle sx={{ color: "var(--card-foreground)" }}>
          Add New Point
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 1,
              minWidth: 300,
            }}
          >
            <TextField
              label="Name (optional)"
              value={newPoint.name}
              onChange={(e) =>
                setNewPoint((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Leave empty for random name"
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "var(--input)",
                  color: "var(--card-foreground)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--muted-foreground)",
                },
              }}
            />
            <TextField
              label="X Coordinate"
              type="number"
              inputProps={{ step: 0.01, min: -10, max: 10 }}
              value={newPoint.x}
              onChange={(e) =>
                setNewPoint((prev) => ({ ...prev, x: Number(e.target.value) }))
              }
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "var(--input)",
                  color: "var(--card-foreground)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--muted-foreground)",
                },
              }}
            />
            <TextField
              label="Y Coordinate"
              type="number"
              inputProps={{ step: 0.01, min: -10, max: 10 }}
              value={newPoint.y}
              onChange={(e) =>
                setNewPoint((prev) => ({ ...prev, y: Number(e.target.value) }))
              }
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: "var(--input)",
                  color: "var(--card-foreground)",
                },
                "& .MuiInputLabel-root": {
                  color: "var(--muted-foreground)",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAddDialogOpen(false)}
            sx={{ color: "var(--muted-foreground)" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddPoint}
            variant="contained"
            sx={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              "&:hover": { backgroundColor: "var(--primary)/90" },
            }}
          >
            Add Point
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
