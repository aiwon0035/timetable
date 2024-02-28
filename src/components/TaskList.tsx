import { useTodosAtom } from "@/hooks/useTodosAtom";

import Task from "./Task";
import { Flex } from "@chakra-ui/react";

const TaskList = ({ id }: { id: string }) => {
  const { todos, setTodos } = useTodosAtom(id);

  return (
    <>
      <Flex direction={"column"} gap={2}>
        {todos.map((todo) => (
          <>
            <Task key={todo.uuid} props={todo} id={id} />
          </>
        ))}
      </Flex>
    </>
  );
};

export default TaskList;
