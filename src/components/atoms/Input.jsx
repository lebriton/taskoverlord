export default function Input({ value, placeholder, isRequired }) {
  return (
    <input
      className="rounded-md border px-3 py-1.5 text-sm text-neutral-900 placeholder-neutral-500 focus:outline focus:outline-2 focus:outline-blue-600"
      type="text"
      value={value}
      placeholder={placeholder}
      required={isRequired}
    />
  );
}
