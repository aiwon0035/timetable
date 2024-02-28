"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  Input,
  Textarea,
  Flex,
} from "@chakra-ui/react";

import SelectColor from "./SelectColor";
import { useTodosAtom } from "@/hooks/useTodosAtom";
import { FormType, InputType } from "./AddTask";

const EditTask = ({
  uuid,
  isOpen,
  id,
  onClose,
}: {
  uuid: string;
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
    control,
  } = useForm<InputType>();

  const { todos, setTodos } = useTodosAtom(id);

  const targetTodo = todos.find((todo) => todo.uuid === uuid);

  const onSubmit: SubmitHandler<InputType> = (data) => {
    const updatedData: FormType = { uuid: uuid, ...data };

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.uuid === uuid ? updatedData : todo))
    );
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
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
                  placeholder="タイトル"
                  defaultValue={targetTodo?.title}
                  className="mt-5"
                />
              </ModalHeader>

              <ModalBody pb={6}>
                <Flex direction={"column"} gap={5}>
                  <Textarea
                    {...register("description")}
                    placeholder="詳細"
                    defaultValue={targetTodo?.description}
                  />
                  <Input
                    {...register("location")}
                    placeholder="場所"
                    defaultValue={targetTodo?.location}
                  />
                  <Input
                    {...register("url")}
                    placeholder="URL"
                    defaultValue={targetTodo?.url}
                  />
                  <Controller
                    name="color"
                    control={control}
                    defaultValue={targetTodo?.color}
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

export default EditTask;
