// Agentix One Solution mark — hexagon built from a purple "A" and a white "1".
// Shared by the React logo, favicon and share image. ViewBox: 0 0 200 200.
export const LOGO_VIEWBOX = "0 0 200 200";

export const logoShapes = [
  // left bevel frame (upper-left + left edge)
  { points: "94,11 20,54 20,146 33,138 33,62 94,25", fill: "#8B45EC" },
  { points: "94,11 20,54 33,62 94,25", fill: "#C79BFF" },
  // right bevel bar
  { points: "164,47 180,55 180,138 164,130", fill: "#B565FF" },
  // white "1" with flag + base chevron
  { points: "107,10 159,39 159,137 180,146 100,191 49,159 62,149 100,169 140,147 140,48", fill: "#FFFFFF" },
  // base bevel
  { points: "100,191 180,146 180,153 100,199", fill: "#D9D9E3" },
] as const;

// "A": outer slanted shape with triangular counter (even-odd)
export const logoA = {
  d: "M24 152 L98 15 L135 56 L135 106 L90 106 L62 152 Z M99 44 L126 96 L74 96 Z",
  fill: "#A65BFF",
  highlight: "M24 152 L98 15 L106 24 L44 152 Z",
  highlightFill: "#C79BFF",
};
