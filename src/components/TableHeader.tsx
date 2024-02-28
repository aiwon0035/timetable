"use client";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { CalendarIcon, EditIcon } from "@chakra-ui/icons";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

const date = new Date(
  Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
);
const dateAtom = atomWithStorage("date", date);

const TableHeader = () => {
  const [startDate, setStartDate] = useAtom(dateAtom);

  registerLocale("ja", ja);

  // 開始日から1週間分の日付と曜日を計算する関数
  const calculateWeekDates = (start: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(currentDate.getDate() + i);
      days.push({
        date: currentDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        }),
        day: ["日", "月", "火", "水", "木", "金", "土"][currentDate.getDay()],
      });
    }
    return days;
  };

  const weekDates = calculateWeekDates(startDate);

  return (
    <Grid templateColumns="200px 1fr">
      <Flex
        className=" text-gray-600 border-r-[1px]"
        justify={"center"}
        pos={"sticky"}
        top={0}
        left={0}
        pl={5}
        zIndex={10}
        bg={"white"}
      >
        <DatePicker
          showIcon
          // selected={startDate} これあったからループしてた
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="MM/dd"
          locale="ja"
          value="　開始日を選択"
          className="cursor-pointer inline w-[150px] hover:bg-slate-100"
          icon={<CalendarIcon />}
        />
      </Flex>
      <Grid templateColumns={"repeat(7, 1fr)"} mr={6}>
        {weekDates.map((day, index) => (
          <Text
            key={index}
            className="border-l-[1px]"
            textAlign={"center"}
            color={"gray.600"}
            fontSize="sm"
            minW={0}
            py={2}
          >
            {day.date} ({day.day})
          </Text>
        ))}
      </Grid>
    </Grid>
  );
};

export default TableHeader;
