import { atomWithStorage } from "jotai/utils";

type HeadItemType = {
  title: string;
  start: string;
  end: string;
};

export type HeadType = Record<string, HeadItemType>;

export const columnHead: HeadType = {
  "1": { title: "1限目", start: "00:00", end: "00:00" },
  "2": { title: "2限目", start: "00:00", end: "00:00" },
  "3": { title: "3限目", start: "00:00", end: "00:00" },
  "4": { title: "4限目", start: "00:00", end: "00:00" },
  "5": { title: "5限目", start: "00:00", end: "00:00" },
};

// atomWithStorageを実行し、データをlocalStorageに保存
export const columnHeadAtom = atomWithStorage("column", columnHead);
