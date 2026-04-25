export default function CategoryCard({ category, navigate, index = 0 }) {
  return (
    <article
      className="category-card interactive-card reveal-card"
      style={{ '--delay': `${index * 70}ms` }}
      onClick={() => navigate('/configurator')}
      role="button"
      tabIndex="0"
      onKeyDown={(event) => event.key === 'Enter' && navigate('/configurator')}
    >
      <div className="card-image-wrap category-image">
        <img src={category.image_url} alt={category.name} loading="lazy" />
      </div>
      <div className="category-copy">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </article>
  );
}
