"use client";
import { v4 as uuidv4 } from "uuid";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  Input,
  Textarea,
  Flex,
  Box,
} from "@chakra-ui/react";

import SelectColor from "./SelectColor";

import { useTodosAtom } from "@/hooks/useTodosAtom";
import { PlusSquareIcon } from "@chakra-ui/icons";

type PropsType = {
  id: string;
  length: number;
};

export type FormType = {
  uuid: string;
  title: string;
  description: string;
  location: string;
  url: string;
  color: string;
};

export type InputType = {
  title: string;
  description: string;
  location: string;
  url: string;
  color: string;
};

const AddTask = ({ id, length }: PropsType) => {
  const {
    handleSubmit,
    register,

    reset,
    formState: { isSubmitting },
    control,
  } = useForm<InputType>(); //ここに型つけないと、onSubmitに型エラーが出続ける
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { todos, setTodos } = useTodosAtom(id);

  const onSubmit: SubmitHandler<InputType> = (data) => {
    //フォームの入力内容をlocalstrageに保存
    const uniqueId = uuidv4();
    const updatedData: FormType = { uuid: uniqueId, ...data };

    setTodos((prevData) => [...prevData, updatedData]);

    onClose();
    reset();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Box
        h={length === 1 ? "66%" : length === 2 ? "40%" : "100%"}
        className=" cursor-pointer"
        onClick={onOpen}
      >
        <Flex
          align={"center"}
          justify={"center"}
          h={"100%"}
          _hover={{ opacity: "100" }}
          opacity={0}
        >
          <PlusSquareIcon color={"gray"} />
        </Flex>
      </Box>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <ModalHeader>
                <Input
                  {...register("title")}
                  className="mt-5"
                  placeholder="タイトル"
                />
              </ModalHeader>

              <ModalBody pb={6}>
                <Flex direction={"column"} gap={5}>
                  <Textarea {...register("description")} placeholder="詳細" />
                  <Input {...register("location")} placeholder="場所" />
                  <Input {...register("url")} placeholder="URL" />
                  <Controller
                    name="color"
                    control={control}
                    defaultValue="blue.100"
                    render={({ field }) => <SelectColor field={field} />}
                  />
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Flex gap={2}>
                  <Button
                    colorScheme="blue"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </Flex>
              </ModalFooter>
            </FormControl>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTask;
