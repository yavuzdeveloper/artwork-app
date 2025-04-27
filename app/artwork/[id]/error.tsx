"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-4 text-red-500">
      <h2>Failed to load artwork!</h2>
      <p>{error.message}</p>
    </div>
  );
}
