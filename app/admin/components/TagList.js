export default function TagList({ tags }) {
  return (
    <ul>
    {tags?.map((tag) => (
      <li key={tag.id} style={{ color: tag.color }}>{tag.name}</li>
    ))}
  </ul>
  );
}