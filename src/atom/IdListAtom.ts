import { atomWithStorage } from "jotai/utils";

export const defaultId = [1, 2, 3, 4, 5];
export const idListAtom = atomWithStorage("list", defaultId);
