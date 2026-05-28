export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 rounded-full border-2 border-[var(--marvel-red)] border-t-transparent animate-spin-slow" />
      <p className="text-sm font-medium text-[var(--marvel-light-gray)] font-heading tracking-wider uppercase">
        Loading...
      </p>
    </div>
  );
}
