import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Point {
  id: string;
  name: string;
  x: number;
  y: number;
}

interface D3ChartProps {
  points: Point[];
  setPoints: (points: Point[]) => void;
  hoveredPointId: string | null;
  onPointHover: (id: string | null) => void;
}

export function D3Chart({ points, setPoints, hoveredPointId, onPointHover }: D3ChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 50, left: 60 };

    svg.attr("width", width).attr("height", height);

    // Define data domain for better scaling
    const xDomain = [0, 100];
    const yDomain = [0, 100];

    // Scales
    const xScale = d3.scaleLinear().domain(xDomain).range([margin.left, width - margin.right]);
    const yScale = d3.scaleLinear().domain(yDomain).range([height - margin.bottom, margin.top]);

    // X Axis
    const xAxis = d3.axisBottom(xScale).ticks(10);
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // X Axis Label
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "14px")
      .text("X");

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(10);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    // Y Axis Label
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "14px")
      .text("Y");

    // Add circles
    svg
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 8)
      .attr("fill", (d) => (d.id === hoveredPointId ? "tomato" : "steelblue"))
      .call(
        d3
          .drag<SVGCircleElement, Point>()
          .on("drag", (event, d) => {
            const newX = xScale.invert(event.x);
            const newY = yScale.invert(event.y);
            const updated = points.map((p) => (p.id === d.id ? { ...p, x: newX, y: newY } : p));
            setPoints(updated);
          })
      )
      .on("mouseover", (_, d) => onPointHover(d.id))
      .on("mouseout", () => onPointHover(null));

    // Double-click to add new points
    svg.on("dblclick", (event) => {
      const [mouseX, mouseY] = d3.pointer(event);
      const newPoint: Point = {
        id: Date.now().toString(),
        name: `Point ${points.length + 1}`,
        x: xScale.invert(mouseX),
        y: yScale.invert(mouseY),
      };
      setPoints([...points, newPoint]);
    });
  }, [points, hoveredPointId]);

  return <svg ref={svgRef}></svg>;
}
