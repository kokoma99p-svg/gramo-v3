import CategoryCard from './CategoryCard.jsx';

export default function CategoryGrid({ categories, navigate, standalone = false }) {
  return (
    <main className={standalone ? 'page-main' : ''}>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse menu</p>
            <h2>Choose a category, then personalize every gram.</h2>
          </div>
          <button className="link-button" onClick={() => navigate('/configurator')}>Start customizing</button>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <CategoryCard category={category} key={category.id || category.slug} navigate={navigate} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
