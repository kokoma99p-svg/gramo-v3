export default function GramControl({ value, min, max, onChange }) {
  const step = 5;
  const safeValue = Number(value || 0);

  function update(next) {
    const bounded = Math.min(Number(max), Math.max(Number(min), Number(next)));
    onChange(bounded);
  }

  return (
    <div className="gram-control">
      <button type="button" onClick={() => update(safeValue - step)} aria-label="Decrease grams">-</button>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(event) => update(event.target.value)}
      />
      <button type="button" onClick={() => update(safeValue + step)} aria-label="Increase grams">+</button>
      <strong>{safeValue}g</strong>
    </div>
  );
}
