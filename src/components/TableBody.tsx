"use client";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import ClassBlock from "./ClassBlock";
import ColumnHead from "./ColumnHead";
import { useAtom } from "jotai";
import { columnHeadAtom } from "@/atom/ColumnHeadAtom";
import { DeleteIcon, DragHandleIcon } from "@chakra-ui/icons";
import { idListAtom } from "@/atom/IdListAtom";
import { useTodosAtom } from "@/hooks/useTodosAtom";
import { RESET } from "jotai/utils";

export const modalnum = [1, 2, 3, 4, 5, 6, 7];

type TableBodyProps = {
  id: string | number;
};

export function TableBody(props: TableBodyProps) {
  const {
    isDragging,
    // 並び替えのつまみ部分に設定するプロパティ
    setActivatorNodeRef,
    attributes,
    listeners,
    // DOM全体に対して設定するプロパティ
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: isDragging ? "0px 0px 15px 0px rgba(0,0,0,0.1)" : "",
    zIndex: isDragging ? 10 : 0, //relativeないと効かない
  };

  const [items, setItems] = useAtom(idListAtom);
  const [columnHeadValues, setColumnHeadValues] = useAtom(columnHeadAtom);
  const [isHovered, setIsHovered] = useState(false);

  //行を消した時行に含まれるデータ全てを削除するために、行全てのsetTodosを取得する
  const { setTodos: setTodos1 } = useTodosAtom(`${props.id}-1`);
  const { setTodos: setTodos2 } = useTodosAtom(`${props.id}-2`);
  const { setTodos: setTodos3 } = useTodosAtom(`${props.id}-3`);
  const { setTodos: setTodos4 } = useTodosAtom(`${props.id}-4`);
  const { setTodos: setTodos5 } = useTodosAtom(`${props.id}-5`);
  const { setTodos: setTodos6 } = useTodosAtom(`${props.id}-6`);
  const { setTodos: setTodos7 } = useTodosAtom(`${props.id}-7`);

  const handleDelete = () => {
    const newItems = items.filter((num) => num !== props.id);
    setItems(newItems);
    setColumnHeadValues((prevColumnHeadValues) => {
      const newColumnHeadValues = { ...prevColumnHeadValues };
      delete newColumnHeadValues[props.id];
      return newColumnHeadValues;
    });

    setTodos1(RESET);
    setTodos2(RESET);
    setTodos3(RESET);
    setTodos4(RESET);
    setTodos5(RESET);
    setTodos6(RESET);
    setTodos7(RESET);
  };

  return (
    <>
      <Box>
        <Box ref={setNodeRef} style={style} bg="white" pos={"relative"}>
          <Grid templateColumns="200px 1fr" bg={"white"}>
            <Box
              pos={"sticky"}
              top={0}
              left={0}
              bg={"white"}
              zIndex={50}
              minH={150}
            >
              <Box
                ml={6}
                py={2}
                className="border-r-[1px] border-t-[1px]"
                bg={"white"}
                h={"100%"}
              >
                <Popover placement="right">
                  {({ onClose }) => (
                    <>
                      <PopoverTrigger>
                        <DeleteIcon
                          className="cursor-pointer"
                          pos={"absolute"}
                          top={"10%"}
                          left={"15%"}
                          color={"gray.500"}
                        />
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

                <Box
                  ref={setActivatorNodeRef}
                  {...listeners}
                  {...attributes}
                  className="text-lg font-medium text-gray-900 dark:text-white"
                  pos={"absolute"}
                  top={"45%"}
                  left={"15%"}
                  color={"gray.500"}
                >
                  <DragHandleIcon _active={{ cursor: "grabbing" }} />
                </Box>
                <ColumnHead id={props.id as string} />
              </Box>
            </Box>
            <Grid
              templateColumns={"repeat(7, 1fr)"}
              className="border-t-[1px]"
              mr={6}
            >
              {modalnum.map((num) => (
                <GridItem
                  key={num}
                  minH={150}
                  minW={"0%"}
                  className=" hover:bg-gray-50 border-l-[1px]"
                >
                  <ClassBlock id={props.id + "-" + num} />
                </GridItem>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default TableBody;
