const TABS = [
  { href: '', icon: '🏠', label: 'Home', match: [''] },
  { href: 'learn', icon: '🎓', label: 'Learn', match: ['learn', 'alphabet', 'vocab', 'parse', 'match', 'lessons'] },
  { href: 'verses', icon: '📜', label: 'Read', match: ['verses'] },
  { href: 'discover', icon: '💡', label: 'Discover', match: ['discover', 'light', 'world', 'lexicon'] },
  { href: 'trophies', icon: '🏆', label: 'Me', match: ['trophies', 'settings'] },
];

export function BottomNav({ page }: { page: string }) {
  return (
    <nav className="bottom-nav" aria-label="Main">
      {TABS.map((t) => {
        const active = t.match.includes(page);
        return (
          <a key={t.label} href={`#/${t.href}`} className={active ? 'on' : ''} aria-current={active ? 'page' : undefined}>
            <span aria-hidden="true">{t.icon}</span>
            {t.label}
          </a>
        );
      })}
    </nav>
  );
}
