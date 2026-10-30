export const CubeMark = ({ size = 30 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 36"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M16 1 31 9.5V27L16 35 1 27V9.5L16 1Z"
      fill="#F3D563"
      stroke="#51421E"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="m1 9.5 15 8.7 15-8.7M16 18.2V35M6 6.7l15 8.6v16.9M11 3.8l15 8.6v17M6 29.7v-17l15-8.6M11 32.5v-17L26 6.7M1 15.3l15 8.5 15-8.5M1 21l15 8.6L31 21"
      stroke="#51421E"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  </svg>
);

export const Brand = () => (
  <span className="inline-flex items-center gap-2">
    <CubeMark size={24} />
    <span className="font-display text-[27px] leading-none tracking-wide">
      cubedeck
    </span>
  </span>
);
