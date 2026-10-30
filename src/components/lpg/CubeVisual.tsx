export const CubeVisual = () => (
  <svg viewBox="0 0 230 220" fill="none" width="100%" aria-hidden="true">
    <ellipse cx="115" cy="202" rx="77" ry="9" fill="#8C7325" opacity=".12" />
    <g stroke="#4D472B" strokeWidth="2.3" strokeLinejoin="round">
      <g transform="matrix(.94 .47 -.94 .47 110 12)">
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={(i % 3) * 30}
            y={Math.floor(i / 3) * 30}
            width="28"
            height="28"
            rx="2"
            fill={
              [
                "#F9E897",
                "#F9E897",
                "#F2D165",
                "#F5DC7D",
                "#FFECAF",
                "#F5DC7D",
                "#F3D36C",
                "#F8E28D",
                "#F3D36C",
              ][i]
            }
          />
        ))}
      </g>
      <g transform="matrix(.94 .47 0 1 25.4 54.3)">
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={(i % 3) * 30}
            y={Math.floor(i / 3) * 30}
            width="28"
            height="28"
            rx="2"
            fill={
              [
                "#DEA448",
                "#E5B04F",
                "#D99C3B",
                "#E1AA49",
                "#E9B756",
                "#E3AC48",
                "#D69B3D",
                "#DFA747",
                "#D39739",
              ][i]
            }
          />
        ))}
      </g>
      <g transform="matrix(.94 -.47 0 1 110 96.6)">
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={(i % 3) * 30}
            y={Math.floor(i / 3) * 30}
            width="28"
            height="28"
            rx="2"
            fill={
              [
                "#727D58",
                "#65704B",
                "#78835E",
                "#69734F",
                "#85916A",
                "#65704C",
                "#75815B",
                "#697550",
                "#7B8860",
              ][i]
            }
          />
        ))}
      </g>
    </g>
  </svg>
);
