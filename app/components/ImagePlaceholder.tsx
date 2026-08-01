export default function ImagePlaceholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-slate text-paper/50 ${className}`}
    >
      <span className="text-xs uppercase tracking-widest italic px-4 text-center">
        {label}
      </span>
    </div>
  );
}