/**
 * AuthBackground — decorative motion-graphics layer for the auth page.
 *
 * Purely presentational: it renders behind the form and never intercepts
 * pointer events (pointer-events-none), so it cannot block form interaction.
 *
 * The design uses the Ghazara "Growth Axis" palette (deep iris + honeyed amber)
 * as floating gradient orbs with slow, staggered parallax drift. Motion is
 * restrained and respects `prefers-reduced-motion` via framer-motion's
 * `useReducedMotion` hook — accessibility-first, per the project's WCAG stance.
 *
 * Keeping this as an isolated component means the form file stays focused on
 * logic and the animation budget is self-contained (no layout thrash from
 * animating layout-affecting properties — we only animate `transform`/`opacity`).
 */
import { motion, useReducedMotion } from "framer-motion";

const ORBS = [
  { color: "var(--deep-iris)", size: 520, x: "-8%", y: "-12%", duration: 22 },
  { color: "var(--amethyst)", size: 420, x: "62%", y: "8%", duration: 28 },
  { color: "var(--honeyed-amber)", size: 360, x: "30%", y: "62%", duration: 25 },
];

export default function AuthBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base gradient wash tying the layer to the brand surfaces. */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--ink)] via-[#1d1830] to-[var(--ink)]" />

      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle at center, ${orb.color} 0%, transparent 70%)`,
            opacity: reduce ? 0.18 : 0.3,
          }}
          // When reduced motion is requested, hold the orbs still (animate to a
          // static position once) instead of looping the drift indefinitely.
          animate={
            reduce
              ? { scale: 1 }
              : {
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: orb.duration,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle animated grid lines for a "structural" feel, opacity kept very
          low so it never competes with the form for attention. */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        animate={reduce ? { opacity: 0.04 } : { opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 12, repeat: reduce ? 0 : Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
