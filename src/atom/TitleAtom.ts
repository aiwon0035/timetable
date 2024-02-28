import { atomWithStorage } from "jotai/utils";

const title = "時間割型TODO管理アプリ";
export const titleAtom = atomWithStorage("title", title);
