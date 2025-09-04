import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import type { MockStoreEnhanced } from "redux-mock-store";
import type { Point } from "../../store/pointsSlice";
import type { AppDispatch } from "../../store";
import { D3Chart } from "../D3Chart";

describe("D3Chart Component", () => {
  let store: MockStoreEnhanced<{ points: { points: Point[] } }, unknown>;
  let onPointHover: jest.Mock<void, [string | null]>;

  beforeEach(() => {
    const mockStore = configureStore<{ points: { points: Point[] } }>();
    store = mockStore({
      points: {
        points: [{ id: "1", name: "Point 1", x: 100, y: 200 }],
      },
    }) as MockStoreEnhanced<{ points: { points: Point[] } }, unknown>;

    store.dispatch = jest.fn() as jest.MockedFunction<AppDispatch>;
    onPointHover = jest.fn();
  });

  test("renders SVG element", () => {
    const { container } = render(
      <Provider store={store}>
        <D3Chart hoveredPointId={null} onPointHover={onPointHover} />
      </Provider>
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  test("calls onPointHover on mouseover and mouseout", () => {
    const { container } = render(
      <Provider store={store}>
        <D3Chart hoveredPointId={null} onPointHover={onPointHover} />
      </Provider>
    );

    const circle = container.querySelector("circle");
    expect(circle).toBeInTheDocument();

    fireEvent.mouseOver(circle!);
    expect(onPointHover).toHaveBeenCalledWith("1");

    fireEvent.mouseOut(circle!);
    expect(onPointHover).toHaveBeenCalledWith(null);
  });

  test("dispatches addPoint on double click", () => {
    const { container } = render(
      <Provider store={store}>
        <D3Chart hoveredPointId={null} onPointHover={onPointHover} />
      </Provider>
    );

    const svg = container.querySelector("svg")!;
    fireEvent.dblClick(svg, { clientX: 300, clientY: 300 });

    expect(store.dispatch).toHaveBeenCalled();
    const dispatchedAction = (store.dispatch as jest.Mock).mock.calls[0][0];
    expect(dispatchedAction.type).toBe("points/addPoint");
    expect(dispatchedAction.payload).toHaveProperty("id");
    expect(dispatchedAction.payload).toHaveProperty("x");
    expect(dispatchedAction.payload).toHaveProperty("y");
    expect(dispatchedAction.payload).toHaveProperty("name");
  });

  test("dispatches updatePoint on drag", () => {
    const { container } = render(
      <Provider store={store}>
        <D3Chart hoveredPointId={null} onPointHover={onPointHover} />
      </Provider>
    );

    const circle = container.querySelector("circle")!;
    fireEvent.mouseDown(circle, { clientX: 100, clientY: 200 });
    fireEvent.mouseMove(circle, { clientX: 150, clientY: 250 });
    fireEvent.mouseUp(circle);

    expect(store.dispatch).toHaveBeenCalled();
    const dispatchedAction = (store.dispatch as jest.Mock).mock.calls[0][0];
    expect(dispatchedAction.type).toBe("points/updatePoint");
    expect(dispatchedAction.payload).toHaveProperty("id", "1");
  });
});
