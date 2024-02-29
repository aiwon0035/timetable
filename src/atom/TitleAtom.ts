import { atomWithStorage } from "jotai/utils";

const title = "時間割型タスク管理アプリ";
export const titleAtom = atomWithStorage("title", title);
