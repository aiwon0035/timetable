import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

import { useTodosAtom } from "@/hooks/useTodosAtom";

import { Box } from "@chakra-ui/react";

const ClassBlock = ({ id }: { id: string }) => {
  const { todos, setTodos } = useTodosAtom(id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        h={"100%"}
        p={2}
      >
        <TaskList id={id} />
        {todos.length < 3 && <AddTask id={id} length={todos.length} />}
      </Box>
    </>
  );
};

export default ClassBlock;
