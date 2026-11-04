export function Back({ to = '', label = 'Back' }: { to?: string; label?: string }) {
  return (
    <a className="back" href={`#/${to}`}>
      ← {label}
    </a>
  );
}
