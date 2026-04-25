export default function AdminImageField({ label = 'Image URL', name = 'image_url', value, onChange }) {
  function clear() {
    onChange({ target: { name, value: '' } });
  }

  return (
    <div className="admin-image-field">
      <label>{label}<input name={name} value={value || ''} onChange={onChange} placeholder="https://..." /></label>
      <div className="admin-image-preview">
        {value ? <img src={value} alt="Preview" /> : <span>No image selected</span>}
      </div>
      {value && <button type="button" className="btn btn-ghost" onClick={clear}>Remove image</button>}
      <small>Use a public optimized image URL, or paste a Supabase Storage public URL.</small>
    </div>
  );
}
