/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./FlipCard.css";

export default function FlipCard({ front, back, width = 300, height = 200 }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? "flipped" : ""}`}
      style={{ width, height }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div className="flip-inner">
        <div className="flip-front">{front}</div>
        <div className="flip-back">{back}</div>
      </div>
    </div>
  );
}
