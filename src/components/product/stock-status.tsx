import type { StockState } from "@/lib/catalog";

const dotColor: Record<StockState["status"], string> = {
  "in-stock": "bg-success",
  "low-stock": "bg-warning",
  "sold-out": "bg-disabled",
};

export function StockStatus({ state }: { state: StockState }) {
  return (
    <p className="flex items-center gap-2 type-small">
      <span aria-hidden="true" className={`size-1.5 rounded-full ${dotColor[state.status]}`} />
      {state.label}
    </p>
  );
}
