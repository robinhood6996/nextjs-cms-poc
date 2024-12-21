interface HeroBlockProps {
  type: string;
  data: string | unknown;
}

export default function HeroBlock({ type, data }: HeroBlockProps) {
  return (
    <div className="hero-block">
      <h1>{type}</h1>
      <p>{typeof data === "string" && data}</p>
    </div>
  );
}
