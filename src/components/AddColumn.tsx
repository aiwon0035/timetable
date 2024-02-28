import { columnHeadAtom } from "@/atom/ColumnHeadAtom";
import { idListAtom } from "@/atom/IdListAtom";
import { Box, Button } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";

const AddColumn = () => {
  const [items, setItems] = useAtom(idListAtom);
  const setColumnHeadValues = useSetAtom(columnHeadAtom);

  const handleAddColumn = () => {
    const itemsMaxNum = Math.max(...items);
    setItems((prevItems) => [...prevItems, itemsMaxNum + 1]);
    setColumnHeadValues((prevItems) => ({
      ...prevItems,
      [itemsMaxNum + 1]: { title: "タイトル", start: "00:00", end: "00:00" },
    }));
  };

  return (
    <Box px={6}>
      <Button
        onClick={handleAddColumn}
        w={"100%"}
        color={"gray"}
        size="xs"
        opacity={0.3}
        borderTopRadius={0}
        borderBottomRadius={"md"}
        _hover={{
          opacity: 1,
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default AddColumn;
