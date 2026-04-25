import OfferCard from './OfferCard.jsx';

export default function OffersSection({ offers, navigate }) {
  if (!offers.length) return null;

  return (
    <section className="section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Promotions</p>
          <h2>Clean offers with real food energy.</h2>
        </div>
        <button className="link-button" onClick={() => navigate('/menu')}>Browse menu</button>
      </div>
      <div className="offer-row">
        {offers.map((offer) => <OfferCard offer={offer} key={offer.id || offer.title} navigate={navigate} />)}
      </div>
    </section>
  );
}
