import { FormType } from "@/components/AddTask";
import { useAtom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { useMemo } from "react";

export const useFormAtom = (id: string) => {
  const formAtom = useMemo(() => atomWithStorage<FormType[]>(id, []), [id]);

  const [formValue, setFormValue] = useAtom(formAtom);

  return { formValue, setFormValue };
};

const idFamily = atomFamily((id: string) =>
  atomWithStorage<FormType[]>(id, [])
);

export const useTodosAtom = (id: string) => {
  const [todos, setTodos] = useAtom(idFamily(id));

  return { todos, setTodos };
};
