import './Avatar.css';

export default function Avatar({ 
  src, 
  name, 
  size = 'md',
  status 
}) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  const colorIndex = name ? name.charCodeAt(0) % 5 : 0;

  return (
    <div className={`avatar avatar-${size} avatar-color-${colorIndex}`}>
      {src ? (
        <img src={src} alt={name} className="avatar-img" />
      ) : (
        <span className="avatar-initials">{initials}</span>
      )}
      {status && <span className={`avatar-status avatar-status-${status}`} />}
    </div>
  );
}
