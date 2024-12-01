interface ProblemProps {
  title: string;
  description: string;
}

export function Problem({ title, description }: ProblemProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="prose max-w-none">
        {description}
      </div>
    </div>
  );
}