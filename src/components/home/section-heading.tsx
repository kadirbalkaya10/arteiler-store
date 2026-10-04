import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  action?: { label: string; href: string };
};

export function SectionHeading({ id, eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <p className="type-eyebrow text-muted">{eyebrow}</p>
        <h2 id={id} className="type-title-l">
          {title}
        </h2>
      </div>
      {action && (
        <Link href={action.href} className="link-cta w-fit">
          {action.label}
          <ArrowIcon />
        </Link>
      )}
    </div>
  );
}
