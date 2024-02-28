import { Flex, Heading, Input } from "@chakra-ui/react";
import Alarm from "./Alarm";
import { useAtom } from "jotai";
import { columnHeadAtom } from "@/atom/ColumnHeadAtom";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

const ColumnHead = ({ id }: { id: string }) => {
  const [columnHeadValues, setColumnHeadValues] = useAtom(columnHeadAtom);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [composing, setComposition] = useState(false);
  const columnHeadValue = columnHeadValues[id];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnHeadValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [e.target.name]: e.target.value },
    }));
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  //エンターを押したらフォーカスを外し入力を確定させる（日本語の場合は変換が確定してから）
  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !composing) {
      e.currentTarget.blur(); // フォーカスを外す（targetだと型エラー出る）
    }
  };

  return (
    <Flex
      direction={"column"}
      pl={"12%"}
      gap={3}
      textAlign={"center"}
      align={"center"}
      justify={"center"}
      h={"100%"}
    >
      {isEditing ? (
        <Input
          autoFocus
          w="80%"
          type="text"
          defaultValue={columnHeadValue?.title}
          onChange={handleChange}
          name="title"
          value={columnHeadValue?.title}
          onBlur={handleBlur}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyPress}
          onCompositionStart={startComposition} //日本語入力開始時に発火
          onCompositionEnd={endComposition} //日本語入力終了時に発火
        />
      ) : (
        <Heading
          size={"sm"}
          onClick={handleClick}
          className="cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          pos={"relative"}
          w={"60%"}
        >
          {columnHeadValue?.title}
          {isHovered && (
            <EditIcon
              pos={"absolute"}
              top={0}
              right={-5}
              boxSize={"0.7em"}
              color={"gray.400"}
            />
          )}
        </Heading>
      )}

      <Flex direction={"column"} gap={0} align={"center"}>
        <Alarm id={id} />
        <Input
          type="time"
          defaultValue={columnHeadValue?.start}
          name="start"
          onChange={handleChange}
          value={columnHeadValue?.start}
          size="sm"
          w={100}
        />
        <span className="rotate-90">〜</span>
        <Input
          type="time"
          defaultValue={columnHeadValue?.end}
          name="end"
          onChange={handleChange}
          value={columnHeadValue?.end}
          size="sm"
          w={100}
        />
      </Flex>
    </Flex>
  );
};

export default ColumnHead;
