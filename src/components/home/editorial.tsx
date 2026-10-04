import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import type { Story } from "@/lib/catalog";

/** Image and copy side by side from md; alternate with `reverse`. */
export function StorySplit({ story, reverse = false }: { story: Story; reverse?: boolean }) {
  const titleId = `story-${story.cta.href.replaceAll("/", "-")}`;

  return (
    <section aria-labelledby={titleId} className="grid md:grid-cols-2 md:items-center">
      <div
        className={`relative aspect-4/5 overflow-hidden bg-surface-media ${reverse ? "md:order-2" : ""}`}
      >
        <Image
          src={story.image.src}
          alt={story.image.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: story.image.position }}
        />
      </div>

      <div className="flex flex-col gap-5 px-gutter py-section md:mx-auto md:max-w-md md:px-8">
        <p className="type-eyebrow text-muted">{story.eyebrow}</p>
        <h2 id={titleId} className="type-title-xl">
          {story.title}
        </h2>
        <p className="type-body text-muted">{story.body}</p>
        <Link href={story.cta.href} className="link-cta mt-2 w-fit">
          {story.cta.label}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

/** Full-width campaign image with centred copy over it. */
export function CampaignBanner({ story }: { story: Story }) {
  return (
    <section aria-labelledby="campaign-title" className="media-editorial">
      <Image
        src={story.image.src}
        alt={story.image.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: story.image.position }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/35" />

      <div className="container-prose absolute inset-0 flex flex-col items-center justify-center gap-5 text-center text-white">
        <p className="type-eyebrow">{story.eyebrow}</p>
        <h2 id="campaign-title" className="type-title-xl">
          {story.title}
        </h2>
        <p className="type-body">{story.body}</p>
        <Link href={story.cta.href} className="btn btn-overlay mt-2">
          {story.cta.label}
        </Link>
      </div>
    </section>
  );
}
