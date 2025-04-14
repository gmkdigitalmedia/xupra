import { useEffect, useRef, useState } from 'react';

interface NetworkNode {
  id: number;
  name: string;
  specialty: string;
  influenceScore: number;
  isKol: boolean;
  x?: number; // Position calculated by D3
  y?: number; // Position calculated by D3
  radius?: number; // Size based on influence
}

interface NetworkLink {
  source: number;
  target: number;
  strength: number; // 0 to 1
}

// Sample data for demonstration
const sampleNodes: NetworkNode[] = [
  { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiology", influenceScore: 92, isKol: true },
  { id: 2, name: "Dr. Michael Lee", specialty: "Oncology", influenceScore: 94, isKol: true },
  { id: 3, name: "Dr. James Wilson", specialty: "Oncology", influenceScore: 85, isKol: true },
  { id: 4, name: "Dr. Lisa Anderson", specialty: "Neurology", influenceScore: 87, isKol: true },
  { id: 5, name: "Dr. David Kim", specialty: "Endocrinology", influenceScore: 83, isKol: true },
  { id: 6, name: "Dr. Jennifer Park", specialty: "Oncology", influenceScore: 76, isKol: false },
  { id: 7, name: "Dr. Robert Johnson", specialty: "Cardiology", influenceScore: 79, isKol: false },
  { id: 8, name: "Dr. Emily Davis", specialty: "Neurology", influenceScore: 72, isKol: false },
  { id: 9, name: "Dr. Thomas Brown", specialty: "Endocrinology", influenceScore: 68, isKol: false },
  { id: 10, name: "Dr. Maria Garcia", specialty: "Cardiology", influenceScore: 75, isKol: false },
  { id: 11, name: "Dr. William Martinez", specialty: "Neurology", influenceScore: 71, isKol: false },
  { id: 12, name: "Dr. Karen Thompson", specialty: "Oncology", influenceScore: 73, isKol: false },
  { id: 13, name: "Dr. Daniel Lewis", specialty: "Cardiology", influenceScore: 69, isKol: false },
  { id: 14, name: "Dr. Michelle Wright", specialty: "Endocrinology", influenceScore: 67, isKol: false },
  { id: 15, name: "Dr. Christopher Young", specialty: "Neurology", influenceScore: 70, isKol: false },
];

const sampleLinks: NetworkLink[] = [
  { source: 1, target: 3, strength: 0.8 },
  { source: 1, target: 7, strength: 0.7 },
  { source: 1, target: 10, strength: 0.9 },
  { source: 1, target: 13, strength: 0.5 },
  { source: 2, target: 3, strength: 0.9 },
  { source: 2, target: 6, strength: 0.8 },
  { source: 2, target: 12, strength: 0.7 },
  { source: 3, target: 6, strength: 0.6 },
  { source: 3, target: 12, strength: 0.7 },
  { source: 4, target: 8, strength: 0.9 },
  { source: 4, target: 11, strength: 0.8 },
  { source: 4, target: 15, strength: 0.7 },
  { source: 5, target: 9, strength: 0.8 },
  { source: 5, target: 14, strength: 0.7 },
  { source: 7, target: 10, strength: 0.6 },
  { source: 7, target: 13, strength: 0.5 },
  { source: 8, target: 11, strength: 0.7 },
  { source: 8, target: 15, strength: 0.6 },
  { source: 9, target: 14, strength: 0.5 },
];

export function InfluenceNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a copy of the nodes for manipulation
    const nodes = [...sampleNodes].map(node => ({
      ...node,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: node.influenceScore / 10 + 5, // Scale node size based on influence
    }));

    // Force directed graph simulation
    const simulate = () => {
      // Apply forces
      for (let i = 0; i < nodes.length; i++) {
        // Center force
        const centerForceX = (canvas.width / 2 - nodes[i].x!) * 0.01;
        const centerForceY = (canvas.height / 2 - nodes[i].y!) * 0.01;
        
        // Node repulsion
        let repulsionForceX = 0;
        let repulsionForceY = 0;
        
        for (let j = 0; j < nodes.length; j++) {
          if (i !== j) {
            const dx = nodes[i].x! - nodes[j].x!;
            const dy = nodes[i].y! - nodes[j].y!;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            
            // Avoid division by zero and limit repulsion at small distances
            const repulsionStrength = 500 / Math.max(distance, 30);
            
            repulsionForceX += (dx / distance) * repulsionStrength;
            repulsionForceY += (dy / distance) * repulsionStrength;
          }
        }
        
        // Link attraction
        let attractionForceX = 0;
        let attractionForceY = 0;
        
        for (const link of sampleLinks) {
          if (link.source === nodes[i].id) {
            const target = nodes.find(n => n.id === link.target);
            if (target) {
              const dx = target.x! - nodes[i].x!;
              const dy = target.y! - nodes[i].y!;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              
              // Link strength affects attraction
              attractionForceX += (dx / distance) * link.strength * 0.1;
              attractionForceY += (dy / distance) * link.strength * 0.1;
            }
          } else if (link.target === nodes[i].id) {
            const source = nodes.find(n => n.id === link.source);
            if (source) {
              const dx = source.x! - nodes[i].x!;
              const dy = source.y! - nodes[i].y!;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              
              // Link strength affects attraction
              attractionForceX += (dx / distance) * link.strength * 0.1;
              attractionForceY += (dy / distance) * link.strength * 0.1;
            }
          }
        }
        
        // Apply all forces
        nodes[i].x! += centerForceX + repulsionForceX + attractionForceX;
        nodes[i].y! += centerForceY + repulsionForceY + attractionForceY;
        
        // Keep nodes within boundaries
        nodes[i].x = Math.max(nodes[i].radius!, Math.min(canvas.width - nodes[i].radius!, nodes[i].x!));
        nodes[i].y = Math.max(nodes[i].radius!, Math.min(canvas.height - nodes[i].radius!, nodes[i].y!));
      }
    };

    // Draw the network
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw links first (underneath nodes)
      ctx.lineWidth = 1;
      for (const link of sampleLinks) {
        const source = nodes.find(n => n.id === link.source);
        const target = nodes.find(n => n.id === link.target);
        if (source && target) {
          ctx.beginPath();
          ctx.moveTo(source.x!, source.y!);
          ctx.lineTo(target.x!, target.y!);
          // Draw stronger links with more opacity
          ctx.strokeStyle = `rgba(100, 130, 200, ${link.strength * 0.7})`;
          ctx.stroke();
        }
      }
      
      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, node.radius!, 0, Math.PI * 2);
        
        // Different styles for KOLs vs regular HCPs
        if (node.isKol) {
          const gradient = ctx.createRadialGradient(
            node.x!, node.y!, 0,
            node.x!, node.y!, node.radius!
          );
          gradient.addColorStop(0, '#6ee7b7'); // emerald-300
          gradient.addColorStop(1, '#059669'); // emerald-600
          ctx.fillStyle = gradient;
        } else {
          const gradient = ctx.createRadialGradient(
            node.x!, node.y!, 0,
            node.x!, node.y!, node.radius!
          );
          gradient.addColorStop(0, '#93c5fd'); // blue-300
          gradient.addColorStop(1, '#3b82f6'); // blue-500
          ctx.fillStyle = gradient;
        }
        
        ctx.fill();
        ctx.strokeStyle = '#1e293b'; // slate-800
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      simulate();
      draw();
      requestAnimationFrame(animate);
    };

    // Handle canvas resize
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    // Handle mouse movement for node hovering
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      
      // Check if mouse is over any node
      let hovered = null;
      for (const node of nodes) {
        const dx = mouseX - node.x!;
        const dy = mouseY - node.y!;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= node.radius!) {
          hovered = node;
          break;
        }
      }
      
      setHoveredNode(hovered);
      if (hovered) {
        setTooltipPosition({ 
          x: event.clientX - rect.left, 
          y: event.clientY - rect.top - 10 
        });
      }
    };

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      {hoveredNode && (
        <div 
          className="absolute bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs z-10 pointer-events-none"
          style={{ 
            left: `${tooltipPosition.x}px`, 
            top: `${tooltipPosition.y - 30}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="font-medium">{hoveredNode.name}</div>
          <div className="text-xs text-gray-300">{hoveredNode.specialty}</div>
          <div className="text-xs">
            <span className="text-emerald-400">Influence: {hoveredNode.influenceScore}</span>
            {hoveredNode.isKol && (
              <span className="ml-1.5 bg-emerald-800 text-white text-[10px] px-1 py-0.5 rounded">KOL</span>
            )}
          </div>
        </div>
      )}
      <div className="absolute bottom-2 right-2 flex items-center space-x-3 text-xs">
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1.5"></span>
          <span>HCP</span>
        </div>
        <div className="flex items-center">
          <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mr-1.5"></span>
          <span>KOL</span>
        </div>
      </div>
    </div>
  );
}