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
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { AppDispatch, RootState } from "../store";
import { addPoint, clearPoints, updatePoint } from "../store/pointsSlice";

interface Point {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface PointsTableProps {
  editingPoint: Point | null;
  setEditingPoint: (point: Point | null) => void;
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
  editingPoint,
  setEditingPoint,
  setPoints,
  hoveredPointId,
  onPointHover,
  addDialogOpen,
  setAddDialogOpen,
  setNewPoint,
  newPoint,
}: PointsTableProps) {
  const points = useSelector((state: RootState) => state.points.points);
  const dispatch = useDispatch<AppDispatch>();
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

  const handleOpenAddDialog = (point?: Point) => {
    if (point) {
      setEditingPoint(point);
      setNewPoint({ name: point.name, x: point.x, y: point.y });
    } else {
      setEditingPoint(null);
      setNewPoint({ name: "", x: 0, y: 0 });
    }
    setAddDialogOpen(true);
  };

  const handleSavePoint = () => {
    if (editingPoint) {
      dispatch(updatePoint({ id: editingPoint.id, ...newPoint }));
    } else {
      dispatch(addPoint(newPoint));
    }
    setAddDialogOpen(false);
  };

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
            <Button variant="contained" onClick={() => handleOpenAddDialog()}>
              + Add Point
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(clearPoints())}
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
              [`& .MuiDataGrid-row[data-id="${hoveredPointId}"]:hover, & .MuiDataGrid-row[data-id="${hoveredPointId}"]`]:
                {
                  backgroundColor: "rgba(34,197,94,0.2)", 
                },
            }),
          }}
        />
      </Box>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>
          {editingPoint ? "Edit Point" : "Add New Point"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newPoint.name}
            onChange={(e) => setNewPoint({ ...newPoint, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="X"
            type="number"
            value={newPoint.x}
            onChange={(e) =>
              setNewPoint({ ...newPoint, x: Number(e.target.value) })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Y"
            type="number"
            value={newPoint.y}
            onChange={(e) =>
              setNewPoint({ ...newPoint, y: Number(e.target.value) })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePoint}>
            {editingPoint ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
