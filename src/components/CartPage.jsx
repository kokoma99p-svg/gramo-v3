export default function CartPage({ cart, removeFromCart, navigate }) {
  const subtotal = cart.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
  const calories = cart.reduce((sum, item) => sum + Number(item.totalCalories || 0), 0);

  return (
    <main className="page-main">
      <section className="section narrow-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Cart</p>
            <h1>Your custom GRAMO order.</h1>
          </div>
          <button className="btn btn-ghost" onClick={() => navigate('/configurator')}>Add item</button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <h2>Your cart is empty.</h2>
            <p>Start with a category and customize grams, calories and price.</p>
            <button className="btn btn-primary" onClick={() => navigate('/configurator')}>Build a meal</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {cart.map((item) => (
                <article className="cart-item" key={item.cartId}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.ingredients.map((ingredient) => `${ingredient.name} ${ingredient.grams}g`).join(', ')}</p>
                    {item.notes && <small>Note: {item.notes}</small>}
                  </div>
                  <div className="cart-item-side">
                    <strong>{Number(item.totalPrice).toFixed(2)} MAD</strong>
                    <span>{item.totalCalories} kcal</span>
                    <button className="link-button danger" onClick={() => removeFromCart(item.cartId)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
            <aside className="checkout-summary">
              <h2>Summary</h2>
              <div><span>Subtotal</span><strong>{subtotal.toFixed(2)} MAD</strong></div>
              <div><span>Calories</span><strong>{calories} kcal</strong></div>
              <button className="btn btn-primary full" onClick={() => navigate('/checkout')}>Checkout</button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
