export function SectionHeader({ eyebrow, title, description, right }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {right || (description ? <p>{description}</p> : null)}
    </div>
  );
}
