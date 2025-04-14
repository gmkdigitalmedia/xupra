import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  specialty: string;
  influence: number;
  group: number;
  isKol: boolean;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
  type: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const generateSampleData = (): GraphData => {
  // Generate sample nodes (Healthcare Professionals)
  const nodes: Node[] = [
    { id: "1", name: "Dr. Sarah Chen", specialty: "Cardiology", influence: 90, group: 1, isKol: true },
    { id: "2", name: "Dr. James Wilson", specialty: "Oncology", influence: 85, group: 2, isKol: true },
    { id: "3", name: "Dr. Maria Rodriguez", specialty: "Neurology", influence: 80, group: 3, isKol: true },
    { id: "4", name: "Dr. David Kim", specialty: "Endocrinology", influence: 83, group: 4, isKol: true },
    { id: "5", name: "Dr. Robert Johnson", specialty: "General Practice", influence: 70, group: 1, isKol: false },
    { id: "6", name: "Dr. Lisa Anderson", specialty: "Neurology", influence: 75, group: 3, isKol: false },
    { id: "7", name: "Dr. Michael Lee", specialty: "Oncology", influence: 72, group: 2, isKol: false },
    { id: "8", name: "Dr. Emily Chang", specialty: "Pediatrics", influence: 68, group: 5, isKol: false },
    { id: "9", name: "Dr. Thomas White", specialty: "Cardiology", influence: 65, group: 1, isKol: false },
    { id: "10", name: "Dr. Jennifer Martinez", specialty: "Immunology", influence: 78, group: 6, isKol: false },
    { id: "11", name: "Dr. Daniel Brown", specialty: "Pulmonology", influence: 62, group: 7, isKol: false },
    { id: "12", name: "Dr. Rebecca Taylor", specialty: "Rheumatology", influence: 64, group: 8, isKol: false },
  ];

  // Generate sample links (connections between HCPs)
  const links: Link[] = [
    { source: "1", target: "5", value: 5, type: "mentor" },
    { source: "1", target: "9", value: 8, type: "collaboration" },
    { source: "2", target: "7", value: 7, type: "mentor" },
    { source: "2", target: "10", value: 4, type: "research" },
    { source: "3", target: "6", value: 9, type: "mentor" },
    { source: "3", target: "12", value: 3, type: "collaboration" },
    { source: "4", target: "8", value: 6, type: "mentor" },
    { source: "4", target: "11", value: 5, type: "research" },
    { source: "1", target: "2", value: 8, type: "collaboration" },
    { source: "1", target: "3", value: 7, type: "research" },
    { source: "2", target: "4", value: 6, type: "collaboration" },
    { source: "3", target: "4", value: 5, type: "research" },
    { source: "5", target: "6", value: 4, type: "collaboration" },
    { source: "7", target: "8", value: 3, type: "collaboration" },
    { source: "9", target: "10", value: 2, type: "research" },
    { source: "11", target: "12", value: 1, type: "collaboration" },
  ];

  return { nodes, links };
};

export const InfluencerNetworkVisualization = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: {
      name: string;
      specialty: string;
      influence: number;
      isKol: boolean;
    };
  }>({
    visible: false,
    x: 0,
    y: 0,
    content: {
      name: '',
      specialty: '',
      influence: 0,
      isKol: false
    }
  });

  // Create force simulation once on mount
  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const data = generateSampleData();

    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Tooltip group
    const tooltip = svg.append("g")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Create links
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value) * 0.7)
      .attr("stroke", d => {
        switch (d.type) {
          case "mentor": return "#4f46e5";
          case "collaboration": return "#10b981";
          case "research": return "#f59e0b";
          default: return "#999";
        }
      });

    // Create nodes
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", d => d.isKol ? 10 : 6 + (d.influence / 20))
      .attr("fill", d => {
        switch (d.group) {
          case 1: return "#4f46e5"; // Indigo
          case 2: return "#8b5cf6"; // Violet
          case 3: return "#ec4899"; // Pink
          case 4: return "#f59e0b"; // Amber
          case 5: return "#10b981"; // Emerald
          case 6: return "#06b6d4"; // Cyan
          case 7: return "#3b82f6"; // Blue
          case 8: return "#ef4444"; // Red
          default: return "#6b7280"; // Gray
        }
      })
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        // Position and show the tooltip
        setTooltipData({
          visible: true,
          x: event.pageX,
          y: event.pageY,
          content: {
            name: d.name,
            specialty: d.specialty,
            influence: d.influence,
            isKol: d.isKol
          }
        });

        // Highlight connected nodes
        const connectedLinks = data.links.filter(l => l.source === d.id || l.target === d.id);
        const connectedNodeIds = new Set([
          ...connectedLinks.map(l => l.source),
          ...connectedLinks.map(l => l.target)
        ]);

        node.attr("opacity", n => connectedNodeIds.has(n.id) || n.id === d.id ? 1 : 0.2);
        link.attr("opacity", l => l.source === d.id || l.target === d.id ? 1 : 0.1);
      })
      .on("mouseout", () => {
        setTooltipData(prev => ({ ...prev, visible: false }));
        node.attr("opacity", 1);
        link.attr("opacity", 1);
      })
      .call(d3.drag<SVGCircleElement, Node>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Add node labels
    svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(data.nodes.filter(d => d.isKol)) // Only show labels for KOLs
      .join("text")
      .attr("font-size", "8px")
      .attr("fill", "white")
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .text(d => d.name.split(' ')[1]);  // Show only last name

    // Create the force simulation
    const simulation = d3.forceSimulation<d3.SimulationNodeDatum & Node>(data.nodes as any)
      .force("link", d3.forceLink<d3.SimulationNodeDatum, d3.SimulationLinkDatum<d3.SimulationNodeDatum>>(data.links as any)
        .id(d => (d as Node).id)
        .distance(100)
        .strength(0.1))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .on("tick", () => {
        link
          .attr("x1", d => (d.source as any).x)
          .attr("y1", d => (d.source as any).y)
          .attr("x2", d => (d.target as any).x)
          .attr("y2", d => (d.target as any).y);

        node
          .attr("cx", d => d.x!)
          .attr("cy", d => d.y!);

        svg.selectAll("text")
          .data(data.nodes.filter(d => d.isKol))
          .attr("x", (d) => d.x!)
          .attr("y", (d) => d.y! + 15);
      });

    // Add legend
    const legendX = 10;
    const legendY = 10;
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${legendX},${legendY})`);

    // Background for legend
    legend.append("rect")
      .attr("width", 150)
      .attr("height", 130)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("fill", "rgba(0,0,0,0.7)");

    // Legend title
    legend.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text("Network Legend");

    // Node types
    legend.append("circle")
      .attr("cx", 20)
      .attr("cy", 40)
      .attr("r", 8)
      .attr("fill", "#4f46e5");

    legend.append("text")
      .attr("x", 35)
      .attr("y", 44)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text("Key Opinion Leader");

    legend.append("circle")
      .attr("cx", 20)
      .attr("cy", 60)
      .attr("r", 6)
      .attr("fill", "#10b981");

    legend.append("text")
      .attr("x", 35)
      .attr("y", 64)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text("Healthcare Professional");

    // Connection types
    legend.append("line")
      .attr("x1", 10)
      .attr("y1", 80)
      .attr("x2", 30)
      .attr("y2", 80)
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2);

    legend.append("text")
      .attr("x", 35)
      .attr("y", 84)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text("Mentorship");

    legend.append("line")
      .attr("x1", 10)
      .attr("y1", 100)
      .attr("x2", 30)
      .attr("y2", 100)
      .attr("stroke", "#10b981")
      .attr("stroke-width", 2);

    legend.append("text")
      .attr("x", 35)
      .attr("y", 104)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text("Collaboration");

    legend.append("line")
      .attr("x1", 10)
      .attr("y1", 120)
      .attr("x2", 30)
      .attr("y2", 120)
      .attr("stroke", "#f59e0b")
      .attr("stroke-width", 2);

    legend.append("text")
      .attr("x", 35)
      .attr("y", 124)
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text("Research");

    // Periodically update to create a dynamic effect
    const interval = setInterval(() => {
      // Gently push some nodes
      data.nodes.forEach((node, i) => {
        if (i % 3 === 0) { // Only affect some nodes
          const push = { 
            x: (Math.random() - 0.5) * 10, 
            y: (Math.random() - 0.5) * 10 
          };
          
          if (node.x && node.y) {
            node.x += push.x;
            node.y += push.y;
          }
        }
      });
      
      // Update the simulation
      simulation.alpha(0.1).restart();
    }, 3000);

    // Cleanup
    return () => {
      clearInterval(interval);
      simulation.stop();
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <svg ref={svgRef} className="w-full h-full" />
      
      {/* Custom tooltip */}
      {tooltipData.visible && (
        <div 
          className="absolute bg-black bg-opacity-80 p-2 rounded text-white text-xs pointer-events-none z-50"
          style={{ 
            left: tooltipData.x + 'px', 
            top: tooltipData.y + 'px',
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="font-bold">{tooltipData.content.name}</div>
          <div className="text-gray-300">{tooltipData.content.specialty}</div>
          <div className="flex justify-between">
            <span>Influence Score:</span>
            <span className="text-emerald-400">{tooltipData.content.influence}</span>
          </div>
          {tooltipData.content.isKol && (
            <div className="mt-1 bg-indigo-900 text-indigo-200 px-1.5 rounded text-center">
              Key Opinion Leader
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfluencerNetworkVisualization;