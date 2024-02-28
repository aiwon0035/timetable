import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";

type TaskPropsType = {
  color: string;
  title: string;
  uuid: string;
};

const Task = ({ props, id }: { props: TaskPropsType; id: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { color, title, uuid } = props;

  return (
    <>
      <Box
        borderLeftColor={color}
        borderRadius={2}
        borderLeftWidth={4}
        bg={"white"}
        boxShadow="base"
      >
        <Flex justify={"space-between"} gap={2}>
          <Text
            onClick={onOpen}
            className="cursor-pointer"
            w={"100%"}
            py={2}
            pl={2}
            fontWeight={600}
            fontSize={"sm"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
          >
            {title}
          </Text>

          <Box p={2}>
            <DeleteTask uuid={uuid} id={id} />
          </Box>
        </Flex>
        <EditTask uuid={uuid} isOpen={isOpen} id={id} onClose={onClose} />
      </Box>
    </>
  );
};

export default Task;
