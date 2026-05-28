interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "circle" | "rect";
  width?: string;
  height?: string;
}

export default function Skeleton({ className = "", variant = "text", width, height }: SkeletonProps) {
  const base = "animate-shimmer rounded-lg bg-gradient-to-r from-transparent via-white/[0.06] to-transparent";
  const variants: Record<string, string> = {
    text: "h-4 w-full",
    card: "h-32 w-full",
    circle: "h-10 w-10 rounded-full",
    rect: "h-20 w-full",
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass rounded-xl p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <Skeleton variant="text" className="mb-2 w-2/3" />
          <Skeleton variant="text" className="w-1/3" />
        </div>
        <Skeleton variant="circle" className="shrink-0" />
      </div>
      <Skeleton variant="text" className="mb-2 w-3/4" />
      <Skeleton variant="text" className="mb-2 w-1/2" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-7xl">
        <Skeleton variant="rect" className="mb-6 h-48 rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
