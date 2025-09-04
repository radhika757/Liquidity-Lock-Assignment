// src/components/D3Chart.tsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";

import type { AppDispatch, RootState } from "../store";
import { addPoint, updatePoint, type Point } from "../store/pointsSlice";

export function D3Chart({
  hoveredPointId,
  onPointHover,
}: {
  hoveredPointId: string | null;
  onPointHover: (id: string | null) => void;
}) {
  const points = useSelector((state: RootState) => state.points.points);
  const dispatch = useDispatch<AppDispatch>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 40, bottom: 40, left: 50 };

    svg.attr("width", width).attr("height", height);

    // Dynamic scale domains
    const xMax = Math.max(500, d3.max(points, (d) => d.x) ?? 500);
    const yMax = Math.max(500, d3.max(points, (d) => d.y) ?? 500);

    const xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    // Remove old axes
    svg.selectAll(".axis").remove();

    // X Axis
    svg
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(10));

    // Y Axis
    svg
      .append("g")
      .attr("class", "axis y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(10));

    // Axis labels
    svg.selectAll(".axis-label").remove();
    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", width - margin.right)
      .attr("y", height - 5)
      .attr("text-anchor", "end")
      .attr("font-size", 14)
      .text("X");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("x", 5)
      .attr("y", margin.top)
      .attr("text-anchor", "start")
      .attr("font-size", 14)
      .text("Y");

    // Create tooltip if it doesn't exist
    let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, unknown> =
      d3.select<HTMLDivElement, unknown>("body #tooltip");

    // If it doesn't exist, create it
    if (tooltip.empty()) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("background", "rgba(0,0,0,0.7)")
        .style("color", "#fff")
        .style("padding", "4px 8px")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("font-size", "12px")
        .style("display", "none") as unknown as d3.Selection<
        HTMLDivElement,
        unknown,
        HTMLElement,
        unknown
      >;
    }

    // Bind data to circles
    const circles = svg
      .selectAll<SVGCircleElement, Point>("circle")
      .data(points, (d: Point) => d.id);

    // EXIT
    circles.exit().remove();

    // ENTER
    const enter = circles
      .enter()
      .append("circle")
      .attr("r", 8)
      .attr("fill", "steelblue")
      .on("mouseover", (event, d) => {
        onPointHover(d.id);
        tooltip
          .style("display", "block")
          .html(`x: ${d.x.toFixed(2)}, y: ${d.y.toFixed(2)}`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.pageY + 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", () => {
        onPointHover(null); // remove highlight
        tooltip.style("display", "none");
      })
      .call(
        d3.drag<SVGCircleElement, Point>().on("drag", (event, d) => {
          const [mouseX, mouseY] = d3.pointer(event, svg.node());
          const newX = xScale.invert(mouseX);
          const newY = yScale.invert(mouseY);
          dispatch(updatePoint({ ...d, x: newX, y: newY }));
        })
      );

    enter
      .merge(circles)
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("fill", (d) =>
        d.id === hoveredPointId ? "limegreen" : "steelblue"
      );

    // Double-click to add new points
    svg.on("dblclick", (event) => {
      const [mouseX, mouseY] = d3.pointer(event);

      const maxId =
        points.length > 0 ? Math.max(...points.map((p) => Number(p.id))) : 0;
      const id = (maxId + 1).toString();

      const name = `Point ${points.length + 1}`;

      const newPointObj = {
        id,
        name,
        x: xScale.invert(mouseX),
        y: yScale.invert(mouseY),
      };

      dispatch(addPoint(newPointObj));
    });
  }, [points, hoveredPointId, dispatch, onPointHover]);

  return (
    <div style={{ width: "100%", height: "650px" }}>
      <svg ref={svgRef} style={{ overflow: "visible" }} />
    </div>
  );
}
