"use client";

import { useState } from "react";

// Not wired to a cart yet: confirms locally so the flow can be reviewed.
export function AddToBag({ soldOut }: { soldOut: boolean }) {
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className="btn btn-primary md:w-full"
        disabled={soldOut}
        onClick={() => setAdded(true)}
      >
        {soldOut ? "Sold out" : "Add to bag"}
      </button>
      <p role="status" className="type-small text-muted">
        {added && "Added to your bag."}
      </p>
    </div>
  );
}
