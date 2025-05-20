import type {
  Collection,
  MutationFn,
  PendingMutation,
} from "@tanstack/react-db";
import type { BlogPost } from "./schema";
import { ElectricCollection } from "@tanstack/db-collections";

export const ingestMutations: MutationFn = async ({ transaction }) => {
  const payload = transaction.mutations.map(
    (mutation: PendingMutation<BlogPost>) => {
      const { collection: _, ...rest } = mutation;

      return { ...rest, query: mutation.collection.config.id };
    },
  );

  const response = await fetch("/ingest/mutations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const result = await response.json();

  const collection: ElectricCollection = transaction.mutations[0]!
    .collection as ElectricCollection;
  await collection.awaitTxId(result.txid);
};
