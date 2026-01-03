const StickFigure = ({ animation, paused }) => {
  return (
    <svg
      viewBox="0 0 160 200"
      width="160"
      height="200"
      className={`stick ${paused ? "paused" : ""}`}
    >
      {/* Head */}
      <circle cx="80" cy="25" r="12" stroke="white" strokeWidth="3" fill="none" />

      {/* Body */}
      <line x1="80" y1="38" x2="80" y2="90" stroke="white" strokeWidth="3" />

      {/* Arms */}
      <line
        x1="80"
        y1="50"
        x2="40"
        y2="70"
        stroke="white"
        strokeWidth="3"
        className={`arm left ${animation}`}
      />
      <line
        x1="80"
        y1="50"
        x2="120"
        y2="70"
        stroke="white"
        strokeWidth="3"
        className={`arm right ${animation}`}
      />

      {/* Legs */}
      <line
        x1="80"
        y1="90"
        x2="55"
        y2="150"
        stroke="white"
        strokeWidth="3"
        className={`leg left ${animation}`}
      />
      <line
        x1="80"
        y1="90"
        x2="105"
        y2="150"
        stroke="white"
        strokeWidth="3"
        className={`leg right ${animation}`}
      />
    </svg>
  );
};

export default StickFigure;

