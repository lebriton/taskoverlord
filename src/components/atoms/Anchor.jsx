export default function Anchor({ text, onClick }) {
  return (
    <span
      className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 hover:underline active:brightness-95"
      onClick={onClick}
    >
      {text}
    </span>
  );
}
