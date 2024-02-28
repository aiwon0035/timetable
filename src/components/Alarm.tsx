import { columnHeadAtom } from "@/atom/ColumnHeadAtom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

const Alarm = ({ id }: { id: string }) => {
  const [currentTime, setCurrentTime] = useState(
    new Date(Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000)
  );

  useEffect(() => {
    // コンポーネントがマウントされたときと1秒ごとに現在の時間を更新する
    const intervalId = setInterval(() => {
      setCurrentTime(
        new Date(
          Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
        )
      );
    }, 1000);

    // クリーンアップ関数でインターバルをクリアする
    return () => clearInterval(intervalId);
  }, []);

  const columnHeadValues = useAtomValue(columnHeadAtom);

  const [startHours, startMinutes] = columnHeadValues[id].start
    .split(":")
    .map(Number);
  const [endHours, endMinutes] = columnHeadValues[id].end
    .split(":")
    .map(Number);

  const playAlarmSound = () => {
    // 音声ファイルのパス
    const soundPath = "/chime.mp3"; // 適切な音声ファイルのパスに置き換える

    // 新しいAudioオブジェクトを作成して音を再生
    const audio = new Audio(soundPath);
    audio.play();
  };

  // アラームをセットした場合、指定した時間になったら音を鳴らす

  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const currentSeconds = currentTime.getSeconds();

  if (
    (currentHours === startHours &&
      currentMinutes === startMinutes &&
      currentSeconds === 0) ||
    (currentHours === endHours &&
      currentMinutes === endMinutes &&
      currentSeconds === 0)
  ) {
    playAlarmSound();
    console.log("時間です");
  }

  return <></>;
};

export default Alarm;
