export default function AsciiDivider() {
  return (
    <div
      className="ascii-divider"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: 'var(--border-color)',
        opacity: 0.5,
        fontSize: '0.75rem',
        marginTop: '4rem',
        marginBottom: '3rem',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      <span style={{ color: 'var(--cyan)', opacity: 0.5 }}>//</span>
      {'─'.repeat(100)}
    </div>
  );
}
