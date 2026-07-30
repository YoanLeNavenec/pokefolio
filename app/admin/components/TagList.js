export default function TagList({ tags }) {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-text-muted/20">
      <h3 className="text-sm font-mono text-text mb-3">Tags</h3>
      <ul className="flex flex-wrap gap-2">
        {tags?.map((tag) => (
          <li
            key={tag.id}
            className="text-xs px-3 py-1.5 rounded-full font-mono"
            style={{ backgroundColor: tag.color, color: '#16140f' }}
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}