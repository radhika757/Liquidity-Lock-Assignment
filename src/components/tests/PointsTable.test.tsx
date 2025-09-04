import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { type MockStoreEnhanced } from "redux-mock-store";
import type { AppDispatch } from "../../store";
import type { Point } from "../../store/pointsSlice";
import { PointsTable } from "../PointsTable";

const mockStore = configureStore([]);

describe("PointsTable Component", () => {
  let store: MockStoreEnhanced<{ points: { points: Point[] } }, unknown>;
  let setEditingPoint: jest.Mock;
  let onPointHover: jest.Mock;
  let setAddDialogOpen: jest.Mock;
  let setNewPoint: jest.Mock;
  let handleAddPoint: jest.Mock;

  const points: Point[] = [
    { id: "1", name: "Point 1", x: 100, y: 200 },
    { id: "2", name: "Point 2", x: 150, y: 250 },
  ];

  beforeEach(() => {
    store = mockStore({ points: { points } }) as MockStoreEnhanced<
      { points: { points: Point[] } },
      unknown
    >;

    store.dispatch = jest.fn() as unknown as AppDispatch;
    setEditingPoint = jest.fn();
    onPointHover = jest.fn();
    setAddDialogOpen = jest.fn();
    setNewPoint = jest.fn();
    handleAddPoint = jest.fn();
  });

  test("renders table rows", () => {
    render(
      <Provider store={store}>
        <PointsTable
          editingPoint={null}
          setEditingPoint={setEditingPoint}
          hoveredPointId={null}
          onPointHover={onPointHover}
          addDialogOpen={false}
          setAddDialogOpen={setAddDialogOpen}
          setNewPoint={setNewPoint}
          handleAddPoint={handleAddPoint} // added required prop
          newPoint={{ name: "", x: 0, y: 0 }}
        />
      </Provider>
    );

    expect(screen.getByText("Point 1")).toBeInTheDocument();
    expect(screen.getByText("Point 2")).toBeInTheDocument();
  });

  test("calls deletePoint on delete button click", () => {
    render(
      <Provider store={store}>
        <PointsTable
          editingPoint={null}
          setEditingPoint={setEditingPoint}
          hoveredPointId={null}
          onPointHover={onPointHover}
          addDialogOpen={false}
          setAddDialogOpen={setAddDialogOpen}
          setNewPoint={setNewPoint}
          handleAddPoint={handleAddPoint}
          newPoint={{ name: "", x: 0, y: 0 }}
        />
      </Provider>
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    expect(store.dispatch).toHaveBeenCalled();
    const dispatchedAction = (store.dispatch as jest.Mock).mock.calls[0][0];
    expect(dispatchedAction.type).toBe("points/deletePoint");
  });

  test("opens add dialog on + Add Point button click", () => {
    render(
      <Provider store={store}>
        <PointsTable
          editingPoint={null}
          setEditingPoint={setEditingPoint}
          hoveredPointId={null}
          onPointHover={onPointHover}
          addDialogOpen={false}
          setAddDialogOpen={setAddDialogOpen}
          setNewPoint={setNewPoint}
          handleAddPoint={handleAddPoint}
          newPoint={{ name: "", x: 0, y: 0 }}
        />
      </Provider>
    );

    const addButton = screen.getByText("+ Add Point");
    fireEvent.click(addButton);

    expect(setAddDialogOpen).toHaveBeenCalledWith(true);
  });

  test("opens edit dialog on Edit button click", () => {
    render(
      <Provider store={store}>
        <PointsTable
          editingPoint={null}
          setEditingPoint={setEditingPoint}
          hoveredPointId={null}
          onPointHover={onPointHover}
          addDialogOpen={false}
          setAddDialogOpen={setAddDialogOpen}
          setNewPoint={setNewPoint}
          handleAddPoint={handleAddPoint}
          newPoint={{ name: "", x: 0, y: 0 }}
        />
      </Provider>
    );

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(setEditingPoint).toHaveBeenCalledWith(points[0]);
    expect(setAddDialogOpen).toHaveBeenCalledWith(true);
  });
});
