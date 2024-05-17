export default function Label({ text, isOptional }) {
  return (
    <label className="mb-2 block text-sm font-medium text-neutral-900">
      {text}
      {isOptional && (
        <span className="font-normal text-neutral-700"> (optional)</span>
      )}
    </label>
  );
}
