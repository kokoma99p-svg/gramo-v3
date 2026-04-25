export default function InfoStrip({ settings }) {
  const chips = [
    ['Hours', settings.openingHours],
    ['Location', settings.address],
    ['Prep', settings.prepTimeText],
    ['Phone', settings.phone]
  ];

  return (
    <section className="info-strip" aria-label="Restaurant information">
      {chips.map(([label, value]) => (
        <div className="info-chip" key={label}>
          <span />
          <div>
            <strong>{label}</strong>
            <small>{value}</small>
          </div>
        </div>
      ))}
    </section>
  );
}
