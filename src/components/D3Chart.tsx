import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface Point {
  id: string
  name: string
  x: number
  y: number
}

interface D3ChartProps {
  points: Point[]
  setPoints: (points: Point[]) => void
  hoveredPointId: string | null
  onPointHover: (id: string | null) => void
}

export function D3Chart({ points, setPoints, hoveredPointId, onPointHover }: D3ChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = 600
    const height = 400

    svg.attr("width", width).attr("height", height)

    // Add circles
    const circles = svg
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 8)
      .attr("fill", (d) => (d.id === hoveredPointId ? "tomato" : "steelblue"))
      .call(
        d3
          .drag<SVGCircleElement, Point>()
          .on("drag", (event, d) => {
            const updated = points.map((p) =>
              p.id === d.id ? { ...p, x: event.x, y: event.y } : p
            )
            setPoints(updated)
          })
      )
      .on("mouseover", (_, d) => onPointHover(d.id))
      .on("mouseout", () => onPointHover(null))

    // Add click handler to add new points
    svg.on("dblclick", (event) => {
      const [x, y] = d3.pointer(event)
      const newPoint: Point = {
        id: Date.now().toString(),
        name: `Point ${points.length + 1}`,
        x,
        y,
      }
      setPoints([...points, newPoint])
    })
  }, [points, hoveredPointId])

  return <svg ref={svgRef}></svg>
}
