export default function OfferCard({ offer, navigate }) {
  const discountLabel = offer.discount_type === 'fixed'
    ? `${offer.discount_value} MAD off`
    : `${offer.discount_value}% off`;

  return (
    <article className="offer-card interactive-card">
      <div className="card-image-wrap">
        <img src={offer.image_url} alt={offer.title} loading="lazy" />
        <span className="badge">{discountLabel}</span>
      </div>
      <div className="card-body">
        <p className="eyebrow">Offer</p>
        <h3>{offer.title}</h3>
        <p>{offer.description}</p>
        {offer.promo_code && <span className="promo-code">Code: {offer.promo_code}</span>}
        <button className="btn btn-small" onClick={() => navigate('/configurator')}>Use offer</button>
      </div>
    </article>
  );
}
