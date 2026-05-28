import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar fade-in">
      <Link href="/" className="nav-link" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>
        Priyanshu
      </Link>
      <div className="nav-links">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/projects" className="nav-link">Projects</Link>
        <Link href="/uses" className="nav-link">Uses</Link>
        <Link href="/blog" className="nav-link">Blog</Link>
      </div>
    </nav>
  );
}
