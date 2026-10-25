# BE SOOCIAL — Dependency Matrix & Peer Compatibility

### Production Dependencies
| Package | Version | Purpose | Peer Requirements |
|---|---|---|---|
| `next` | `^15.4.9` | Core App Router, SSR, Server Actions, Route Handlers | Node 20+, React 19 |
| `react` / `react-dom` | `^19.2.1` | UI Library | React 19 Core |
| `three` | `^0.174.0` | 3D WebGL engine for hero camera lens and floating reels | Compatible with R3F v9 |
| `@react-three/fiber` | `^9.0.4` | Declarative Three.js in React | `react: >=19 <19.4`, `three: >=0.156` |
| `@react-three/drei` | `^10.0.0` | 3D helpers, camera controls, float physics, environment | `@react-three/fiber ^9` |
| `motion` | `^12.23.24` | Viewport entry animations, layout transitions | React 19 |
| `lucide-react` | `^0.553.0` | Accessible vector icons | React 19 |
| `zod` | `^3.24.2` | Schema validation on client and server | TypeScript 5+ |
| `canvas-confetti` | `^1.9.4` | Visual celebration upon confirmed wizard submission | DOM canvas |
| `clsx` / `tailwind-merge` | `^2.1.1` / `^3.3.1` | Utility class merging (`cn()`) | Tailwind CSS |

### Development Dependencies
| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | `4.1.11` | Utility-first styling with `@tailwindcss/postcss` |
| `@types/three` | `^0.174.0` | Type definitions for Three.js |
| `@types/canvas-confetti` | `^1.9.0` | Type definitions for Canvas Confetti |
| `typescript` | `5.9.3` | Type safety in strict mode |
| `eslint` / `eslint-config-next` | `9.39.1` / `16.0.8` | Code quality and linting |
