export default function ConfirmationPage({ navigate }) {
  const type = new URLSearchParams(window.location.search).get('type');
  const isReservation = type === 'reservation';

  return (
    <main className="page-main">
      <section className="section narrow-section">
        <div className="confirmation-card">
          <span className="success-mark">OK</span>
          <p className="eyebrow">Confirmed</p>
          <h1>{isReservation ? 'Reservation received.' : 'Order received.'}</h1>
          <p>{isReservation ? 'GRAMO will review your table request.' : 'Your custom meal order has been sent to GRAMO.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Back home</button>
        </div>
      </section>
    </main>
  );
}
