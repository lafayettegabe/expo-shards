import { create } from "zustand";

type ShardState = {
  shard: string;
  setShard: (shard: string) => void;
};

const useShard = create<ShardState>((set) => ({
  shard: "shard0",
  setShard: (shard) => set({ shard }),
}));

export { useShard };
