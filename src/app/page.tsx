"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TableHeader from "@/components/TableHeader";
import Title from "@/components/Title";
import { Box } from "@chakra-ui/react";
import TableBody from "@/components/TableBody";
import { useAtom } from "jotai";
import { idListAtom } from "@/atom/IdListAtom";
import AddColumn from "@/components/AddColumn";
import HowToUse from "@/components/HowToUse";

function App() {
  ////dnd-kitで必要な、並び替える要素の数
  const [items, setItems] = useAtom(idListAtom);

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeItem = items.find((item) => item === activeId);

  //dnd-kitの並び替え用センサー
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //dnd-kitのドラッグし終えた時に発火されるイベント
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over!.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as number); //as numberないと型エラー
        const newIndex = items.indexOf(over!.id as number);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const { isDragging } = useSortable({ id: activeItem! });

  return (
    <>
      <HowToUse />
      <Title />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        onDragStart={(event) => {
          // ドラッグ中のIDを保存する
          setActiveId(event.active.id as number);
        }}
      >
        <Box
          //ドラッグ中は横スクロールさせない
          overflowX={isDragging ? "auto" : "hidden"}
          boxShadow="base"
          mt={5}
        >
          <Box minW={960} py={6} bg={"white"}>
            <TableHeader />

            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((id) => (
                <TableBody key={id} id={id} />
              ))}
            </SortableContext>

            <AddColumn />
          </Box>
        </Box>
        {/* ドラッグするときの動き */}
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({}),
          }}
        >
          {/* {activeItem && <TableBody id={activeItem} />} dropAnimationある時にこれやると2つ重なってしまう*/}
        </DragOverlay>
      </DndContext>
    </>
  );
}

export default App;
