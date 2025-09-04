// src/components/D3Chart.tsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";

import type { AppDispatch, RootState } from "../store";
import { addPoint, updatePoint } from "../store/pointsSlice";

export function D3Chart() {
  const points = useSelector((state: RootState) => state.points.points);
  const dispatch = useDispatch<AppDispatch>();
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous renders

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
      .range([height - margin.bottom, margin.top]); // invert y-axis

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(10));

    svg
      .append("text")
      .attr("x", width - margin.right)
      .attr("y", height - 5)
      .attr("text-anchor", "end")
      .attr("font-size", 14)
      .text("X");

    // Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(10));

    svg
      .append("text")
      .attr("x", 5)
      .attr("y", margin.top)
      .attr("text-anchor", "start")
      .attr("font-size", 14)
      .text("Y");

    // Draw points
    svg
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 8)
      .attr("fill", "steelblue")
      .call(
        d3.drag<SVGCircleElement, any>().on("drag", (event, d) => {
          const newX = xScale.invert(event.x);
          const newY = yScale.invert(event.y);
          dispatch(updatePoint({ ...d, x: newX, y: newY }));
        })
      );

    // Double-click to add new points
    svg.on("dblclick", (event) => {
      const [mouseX, mouseY] = d3.pointer(event);

      // Get the max existing ID and add 1
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
  }, [points, dispatch]);

  return (
    <div style={{ width: "100%", height: "650px" }}>
      <svg ref={svgRef} style={{ overflow: "visible" }} />
    </div>
  );
}
