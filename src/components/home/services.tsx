import { NewsletterForm } from "@/components/newsletter-form";

type Service = { title: string; body: string };

export function ServicesStrip({ services }: { services: Service[] }) {
  return (
    <section aria-labelledby="services-title" className="container-page section">
      <h2 id="services-title" className="sr-only">
        Our services
      </h2>
      <ul className="grid gap-px bg-divider sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.title} className="flex flex-col gap-2 bg-background py-6 sm:p-6">
            <h3 className="type-title-s">{service.title}</h3>
            <p className="type-small text-muted">{service.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Newsletter() {
  return (
    <section aria-labelledby="newsletter-title" className="border-t border-divider">
      <div className="container-form section flex flex-col gap-6 text-center">
        <p className="type-eyebrow text-muted">Newsletter</p>
        <h2 id="newsletter-title" className="type-title-l">
          First to know
        </h2>
        <p className="type-body text-muted">
          New collections, private appointments and stories from the atelier. No more than twice a
          month.
        </p>
        <div className="text-left">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
