import { LOGO_VIEWBOX, logoA, logoShapes } from "@/lib/logo-paths";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label="Agentix One Solution logo" focusable="false">
      {logoShapes.map((s) => <polygon key={s.points} points={s.points} fill={s.fill} />)}
      <path d={logoA.d} fill={logoA.fill} fillRule="evenodd" />
      <path d={logoA.highlight} fill={logoA.highlightFill} fillOpacity="0.55" />
    </svg>
  );
}
