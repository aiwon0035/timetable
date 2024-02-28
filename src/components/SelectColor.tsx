import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

type FieldProps = {
  value: string;
  onChange: (value: any) => void;
};

const SelectColor: React.FC<{ field: FieldProps }> = ({ field }) => {
  const { value, onChange } = field;
  const colors = [
    "gray.100",
    "red.100",
    "orange.100",
    "yellow.100",
    "teal.100",
    "green.100",
    "blue.100",
    "cyan.100",
    "purple.100",
    "#ffd0e5",
  ];
  return (
    <div>
      <Popover variant="picker">
        <PopoverTrigger>
          <Button
            aria-label={value}
            background={value}
            height="22px"
            width="22px"
            padding={0}
            minWidth="unset"
            borderRadius={3}
          ></Button>
        </PopoverTrigger>
        <PopoverContent width="170px">
          <PopoverArrow />

          <PopoverBody height="70px">
            <SimpleGrid columns={5} spacing={2}>
              {colors.map((c) => (
                <Button
                  key={c}
                  aria-label={c}
                  background={c}
                  height="22px"
                  width="22px"
                  padding={0}
                  minWidth="unset"
                  borderRadius={3}
                  _hover={{ background: c }}
                  onClick={() => onChange(c)} // 色が選択されたときにフォームの値を更新
                ></Button>
              ))}
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectColor;
