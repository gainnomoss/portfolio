export function Meta({
  role,
  collaborators,
  date,
}: {
  role: string;
  collaborators: string;
  date: string;
}) {
  const items = [
    { label: "My Contribution", value: role },
    { label: "Collaborators", value: collaborators },
    { label: "Date", value: date },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-mono text-label text-muted">{item.label}</p>
          <p className="mt-2 text-body-sm text-body">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
