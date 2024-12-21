import { notFound } from "next/navigation";
import { useRouter } from "next/router";

export default function BlogPost() {
  const router = useRouter();
  return (
    <div>
      <h1>{router.query.slug}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores magnam,
        a laboriosam maxime vel aliquid ut culpa praesentium ex recusandae
        distinctio similique qui ea deleniti quis. Magnam et magni odit.
      </p>
    </div>
  );
}
