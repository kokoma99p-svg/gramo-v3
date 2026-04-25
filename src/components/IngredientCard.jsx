import GramControl from './GramControl.jsx';

export default function IngredientCard({ ingredient, grams, onToggle, onGramChange }) {
  const selected = grams > 0;

  return (
    <article className={`ingredient-card interactive-card ${selected ? 'selected' : ''}`}>
      <button type="button" className="ingredient-main" onClick={onToggle}>
        <img src={ingredient.image_url} alt={ingredient.name} loading="lazy" />
        <div>
          <span className="ingredient-type">{ingredient.type}</span>
          <h4>{ingredient.name}</h4>
          <p>{ingredient.price_per_gram} MAD/g - {ingredient.calories_per_gram} kcal/g</p>
        </div>
      </button>
      {selected && (
        <GramControl
          value={grams}
          min={ingredient.min_grams}
          max={ingredient.max_grams}
          onChange={onGramChange}
        />
      )}
    </article>
  );
}
