export default function sanityLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  return `${src}?auto=format&fit=max&w=${width}&q=${quality || 75}`;
}
