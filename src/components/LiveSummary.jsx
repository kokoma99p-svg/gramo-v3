export default function LiveSummary({ category, size, selectedIngredients, totalGrams, totalCalories, totalPrice, onAdd }) {
  return (
    <aside className="live-summary">
      <p className="eyebrow">Live summary</p>
      <h3>{category?.name || 'Custom meal'}</h3>
      <p>{size?.name || 'Choose size'} size</p>
      <div className="summary-metrics">
        <div><strong>{totalGrams}g</strong><span>grams</span></div>
        <div><strong>{Math.round(totalCalories)}</strong><span>kcal</span></div>
        <div><strong>{totalPrice.toFixed(2)}</strong><span>MAD</span></div>
      </div>
      <div className="summary-list">
        {selectedIngredients.map((item) => (
          <span key={item.id}>{item.name} - {item.grams}g</span>
        ))}
      </div>
      <button className="btn btn-primary full" onClick={onAdd} disabled={!size || selectedIngredients.length === 0}>
        Add to cart
      </button>
      <small className="summary-note">Only grams, calories and price are calculated. Protein percentages are intentionally not displayed.</small>
    </aside>
  );
}
