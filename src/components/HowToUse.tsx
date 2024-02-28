import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";

const HowToUse = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null); //Buttonコンポーネントにrefを割り当てる場合、ボタン要素の参照を取得するためにHTMLButtonElementを指定する
  return (
    <>
      <Button onClick={onOpen} ref={btnRef}>
        <QuestionOutlineIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box bg={"gray.100"}>
            <DrawerCloseButton />
            <DrawerHeader>このアプリの使い方</DrawerHeader>
          </Box>
          <DrawerBody mt={5}>
            <Flex direction={"column"} gap={"10"}>
              <Box>
                <Flex direction={"column"} gap={"3"}>
                  <Heading as="h2" size="md">
                    1. 開始日を設定しましょう
                  </Heading>
                  <UnorderedList>
                    <Flex direction={"column"} gap={"2"}>
                      <ListItem>
                        左上の「開始日を選択」から開始日を設定しましょう
                      </ListItem>
                      <ListItem>自動で1週間の日付が入ります</ListItem>
                    </Flex>
                  </UnorderedList>
                </Flex>
              </Box>
              <Box>
                <Flex direction={"column"} gap={"3"}>
                  <Heading as="h2" size="md">
                    2. 時間割を設定しましょう
                  </Heading>
                  <UnorderedList>
                    <Flex direction={"column"} gap={"2"}>
                      <ListItem>
                        一番左の列から、タイトルと時間を設定しましょう
                      </ListItem>
                      <ListItem>
                        時間になるとブラウザからチャイムが鳴ります
                      </ListItem>
                      <ListItem>
                        行が足りないときは一番下の+ボタンから行を追加しましょう
                      </ListItem>
                      <ListItem>行は並び替えることもできます</ListItem>
                    </Flex>
                  </UnorderedList>
                </Flex>
              </Box>
              <Box>
                <Flex direction={"column"} gap={"3"}>
                  <Heading as="h2" size="md">
                    3. タスクを入力しましょう
                  </Heading>
                  <UnorderedList>
                    <Flex direction={"column"} gap={"2"}>
                      <ListItem>
                        コマをクリックしてタスクを追加しましょう
                      </ListItem>
                      <ListItem>
                        1つのコマに入れられるタスクは3つまでです
                      </ListItem>
                    </Flex>
                  </UnorderedList>
                </Flex>
              </Box>
              <Box>
                <Flex direction={"column"} gap={"3"}>
                  <Heading as="h2" size="md">
                    4. タスクを編集しましょう
                  </Heading>
                  <UnorderedList>
                    <Flex direction={"column"} gap={"2"}>
                      <ListItem>
                        タスクをクリックして内容を編集しましょう
                      </ListItem>
                    </Flex>
                  </UnorderedList>
                </Flex>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HowToUse;
