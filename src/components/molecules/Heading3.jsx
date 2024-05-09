import Badge from "../atoms/Badge";

export default function Heading3({ title, badgeText = "" }) {
  return (
    <h3 className="flex items-center gap-1 font-bold leading-none tracking-tight text-neutral-800">
      {title}
      {badgeText && <Badge text={badgeText} variant="dark" style="tight" />}
    </h3>
  );
}
