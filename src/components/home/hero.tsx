import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import type { Story } from "@/lib/catalog";

export function Hero({ story }: { story: Story }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative h-[82svh] min-h-[32rem] overflow-hidden bg-surface-media lg:h-[calc(100svh-7.5rem)] lg:min-h-[40rem]"
    >
      <Image
        src={story.image.src}
        alt={story.image.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: story.image.position }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
      />

      <div className="container-page absolute inset-x-0 bottom-0 flex flex-col gap-5 pb-10 text-white md:pb-14 lg:pb-16">
        <p className="type-eyebrow">{story.eyebrow}</p>
        <h1 id="hero-title" className="max-w-4xl type-display">
          {story.title}
        </h1>
        <p className="max-w-md type-body">{story.body}</p>
        <div className="mt-2 flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <Link href={story.cta.href} className="btn btn-overlay">
            {story.cta.label}
          </Link>
          <Link href="/collections/women" className="link-cta w-fit">
            Shop women
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
