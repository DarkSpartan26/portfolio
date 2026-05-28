interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export default function ProjectCard({ title, description, tags, link }: ProjectCardProps) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card slide-up">
      <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ flex: 1, fontSize: '0.9rem' }}>{description}</p>
      <div style={{ marginTop: '1rem' }}>
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </a>
  );
}
