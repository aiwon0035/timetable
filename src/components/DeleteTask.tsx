import { useTodosAtom } from "@/hooks/useTodosAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

const DeleteTask = ({
  uuid,
  id,
}: {
  uuid: string;
  id: string;
  className?: string;
}) => {
  const { todos, setTodos } = useTodosAtom(id);

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.uuid !== uuid));
  };

  return (
    <Box pos={"relative"}>
      <Popover placement="right">
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <DeleteIcon className="cursor-pointer" color={"gray.500"} />
            </PopoverTrigger>

            <PopoverContent w={120}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  size={"sm"}
                  onClick={() => {
                    handleDelete();
                    onClose();
                  }}
                >
                  削除
                </Button>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </Box>
  );
};

export default DeleteTask;
