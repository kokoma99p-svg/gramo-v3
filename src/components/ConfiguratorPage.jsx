import { useEffect, useMemo, useState } from 'react';
import IngredientCard from './IngredientCard.jsx';
import LiveSummary from './LiveSummary.jsx';

const typeLabels = {
  base: 'Base',
  protein: 'Proteins',
  topping: 'Toppings',
  sauce: 'Sauces',
  supplement: 'Supplements'
};

export default function ConfiguratorPage({ categories, ingredients, sizes, addToCart, navigate }) {
  const [categorySlug, setCategorySlug] = useState(categories[0]?.slug || 'salad');
  const [sizeId, setSizeId] = useState('');
  const [gramsByIngredient, setGramsByIngredient] = useState({});
  const [notes, setNotes] = useState('');

  const category = categories.find((item) => item.slug === categorySlug) || categories[0];
  const categorySizes = sizes.filter((size) => size.category_slug === categorySlug);
  const selectedSize = categorySizes.find((size) => String(size.id) === String(sizeId)) || categorySizes[0];
  const categoryIngredients = ingredients.filter((ingredient) => ingredient.category_slug === categorySlug);

  useEffect(() => {
    setSizeId(categorySizes[0]?.id || '');
    setGramsByIngredient({});
  }, [categorySlug]);

  const groupedIngredients = useMemo(() => {
    return categoryIngredients.reduce((groups, ingredient) => {
      const type = ingredient.type || 'topping';
      groups[type] = groups[type] || [];
      groups[type].push(ingredient);
      return groups;
    }, {});
  }, [categoryIngredients]);

  const selectedIngredients = useMemo(() => {
    return categoryIngredients
      .map((ingredient) => ({ ...ingredient, grams: Number(gramsByIngredient[ingredient.id] || 0) }))
      .filter((ingredient) => ingredient.grams > 0);
  }, [categoryIngredients, gramsByIngredient]);

  const totalGrams = selectedIngredients.reduce((sum, item) => sum + item.grams, 0);
  const ingredientPrice = selectedIngredients.reduce((sum, item) => sum + item.grams * Number(item.price_per_gram || 0), 0);
  const ingredientCalories = selectedIngredients.reduce((sum, item) => sum + item.grams * Number(item.calories_per_gram || 0), 0);
  const totalPrice = Number(selectedSize?.base_price || 0) + ingredientPrice;
  const totalCalories = ingredientCalories;

  function toggleIngredient(ingredient) {
    setGramsByIngredient((current) => {
      const active = Number(current[ingredient.id] || 0) > 0;
      return {
        ...current,
        [ingredient.id]: active ? 0 : Number(ingredient.default_grams || ingredient.min_grams || 50)
      };
    });
  }

  function changeIngredientGrams(ingredient, value) {
    setGramsByIngredient((current) => ({ ...current, [ingredient.id]: value }));
  }

  function addMeal() {
    addToCart({
      name: `${category?.name || 'Custom'} - ${selectedSize?.name || 'Custom'}`,
      category: category?.name,
      size: selectedSize,
      ingredients: selectedIngredients,
      notes,
      totalGrams,
      totalCalories: Math.round(totalCalories),
      totalPrice: Number(totalPrice.toFixed(2))
    });
  }

  return (
    <main className="page-main configurator-page">
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Configurator</p>
            <h1>Build your meal by exact grams.</h1>
            <p className="muted">Choose category, size, ingredients and grams. Live price and calories stay visible.</p>
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('/menu')}>Back to menu</button>
        </div>

        <div className="configurator-layout">
          <div className="configurator-workspace">
            <div className="option-panel">
              <h2>1. Choose category</h2>
              <div className="chip-row">
                {categories.map((item) => (
                  <button key={item.slug} className={`choice-chip ${categorySlug === item.slug ? 'selected' : ''}`} onClick={() => setCategorySlug(item.slug)}>
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-panel">
              <h2>2. Choose size</h2>
              <div className="size-grid">
                {categorySizes.map((size) => (
                  <button key={size.id} className={`size-card ${String(sizeId) === String(size.id) ? 'selected' : ''}`} onClick={() => setSizeId(size.id)}>
                    <strong>{size.name}</strong>
                    <span>{size.grams}g/ml</span>
                    <small>{Number(size.base_price).toFixed(2)} MAD base</small>
                  </button>
                ))}
              </div>
            </div>

            {Object.entries(groupedIngredients).map(([type, list]) => (
              <div className="option-panel" key={type}>
                <h2>{typeLabels[type] || type}</h2>
                <div className="ingredient-grid">
                  {list.map((ingredient) => (
                    <IngredientCard
                      key={ingredient.id}
                      ingredient={ingredient}
                      grams={Number(gramsByIngredient[ingredient.id] || 0)}
                      onToggle={() => toggleIngredient(ingredient)}
                      onGramChange={(value) => changeIngredientGrams(ingredient, value)}
                    />
                  ))}
                </div>
              </div>
            ))}

            <div className="option-panel">
              <h2>Special instructions</h2>
              <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="No onion, sauce on the side, allergy note..." />
            </div>
          </div>

          <LiveSummary
            category={category}
            size={selectedSize}
            selectedIngredients={selectedIngredients}
            totalGrams={totalGrams}
            totalCalories={totalCalories}
            totalPrice={totalPrice}
            onAdd={addMeal}
          />
        </div>
      </section>
    </main>
  );
}
