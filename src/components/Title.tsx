"use client";
import { titleAtom } from "@/atom/TitleAtom";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useState } from "react";

const Title: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [titleValue, setTitleValue] = useAtom(titleAtom);
  const [isHovered, setIsHovered] = useState(false);
  const [composing, setComposition] = useState(false);

  //タイトルをクリックした時
  const handleClick = () => {
    setEditing(true);
  };

  //タイトルからフォーカスが外れた時
  const handleBlur = () => {
    setEditing(false);
  };

  //入力中
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
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
      textAlign="center"
      align={"center"}
      justify={"center"}
      height={"40px"}
    >
      <Box width={"fit-content"} pos={"relative"}>
        {editing ? (
          <>
            <Input
              autoFocus //これないと変な挙動になる
              type="text"
              value={titleValue}
              onChange={handleChange}
              onBlur={handleBlur}
              size={"lg"}
              onKeyDown={handleKeyPress}
              onCompositionStart={startComposition} //日本語入力開始時に発火
              onCompositionEnd={endComposition} //日本語入力終了時に発火
              className="font-bold text-3xl p-2"
            />
          </>
        ) : (
          <>
            <Heading
              size={"lg"}
              onClick={handleClick}
              className="cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {titleValue}
              {isHovered && (
                <EditIcon
                  pos={"absolute"}
                  top={0}
                  right={-8}
                  boxSize={"0.7em"}
                  color={"gray.400"}
                />
              )}
            </Heading>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Title;
