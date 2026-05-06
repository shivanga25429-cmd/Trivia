export default function ProgressBar({ current, total }) {
  const percent = ((current) / total) * 100;

  return (
    <div className="progress-wrap">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="progress-label">
        {current} <span className="progress-sep">/</span> {total}
      </span>
    </div>
  );
}
