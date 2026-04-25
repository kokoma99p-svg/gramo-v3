import { featuredDishes } from '../lib/fallbackData.js';

export default function FeaturedDishCarousel({ navigate }) {
  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Featured dishes</p>
          <h2>Dynamic plates, not a fixed template.</h2>
        </div>
        <button className="link-button" onClick={() => navigate('/configurator')}>Build yours</button>
      </div>
      <div className="featured-scroll" aria-label="Featured dishes">
        {featuredDishes.map((dish, index) => (
          <article className="featured-card interactive-card" key={dish.id} style={{ '--tilt': `${index % 2 === 0 ? -1 : 1}deg` }}>
            <img src={dish.image_url} alt={dish.title} loading="lazy" />
            <div>
              <h3>{dish.title}</h3>
              <p>{dish.subtitle}</p>
              <div className="featured-meta">
                <span>{dish.price} MAD</span>
                <span>{dish.calories} kcal</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
