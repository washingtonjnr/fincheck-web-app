import { useState } from "react";
// Components
import { Dropdown } from "../..";
import { ColorIcon } from "../../../icons/ColorIcon";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
// Utils
import { cn } from "../../../../../app/utils/cn";

type DropdownInputColorsProps = {
  className?: string;
  error?: string;
  value?: string;
  onChange?(color: string): void;
};

type Color = {
  color: string;
  bg: string;
};

const colors: Color[] = [
  { color: "#868E96", bg: "#F8F9FA" },
  { color: "#FA5252", bg: "#FFF5F5" },
  { color: "#E64980", bg: "#FFF0F6" },
  { color: "#BE4BDB", bg: "#F8F0FC" },
  { color: "#7950F2", bg: "#F3F0FF" },
  { color: "#4C6EF5", bg: "#EDF2FF" },
  { color: "#228BE6", bg: "#E7F5FF" },
  { color: "#15AABF", bg: "#E3FAFC" },
  { color: "#12B886", bg: "#E6FCF5" },
  { color: "#40C057", bg: "#EBFBEE" },
  { color: "#82C91E", bg: "#F4FCE3" },
  { color: "#FAB005", bg: "#FFF9DB" },
  { color: "#FD7E14", bg: "#FFF4E6" },
  { color: "#212529", bg: "#F8F9FA" },
];

export function DropdownInputColors({
  className,
  error,
  value,
  onChange,
}: DropdownInputColorsProps) {
  const [selected, setSelected] = useState<Color | null>(() => {
    if(!value) return null;

    const color = colors.find(c => c.color === value);

    return color ?? null;
  });

  function handleSelect(color: Color) {
    setSelected(color);

    onChange?.(color?.color);
  }

  return (
    <div className="relative">
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <button
            className={cn(
              "relative w-full h-[52px] flex justify-between pt-3.5 px-3 text-left rounded-lg border bg-white border-gray-500 text-gray-800 peer placeholder-shown:pt-0 focus:border-gray-700 outline-none transition-all",
              error && "!border-red-900",
              className
            )}
          >
            <span className="">Color</span>

            {/* suffix */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {!selected && (
                <ChevronDownIcon className="w-6 h-6 text-gray-600" />
              )}

              {selected && <ColorIcon bg={selected.bg} color={selected.color} />}
            </div>
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content className="w-full flex flex-wrap justify-center">
          {colors.map(({ bg, color }) => {
            return (
              <Dropdown.Item key={color} onSelect={() => handleSelect({ bg, color })}>
                <ColorIcon bg={bg} color={color} />
              </Dropdown.Item>
            );
          })}
        </Dropdown.Content>
      </Dropdown.Root>

      {error && (
        <div className="flex mt-1 gap-2 items-center text-red-900 text-xs">
          <CrossCircledIcon />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
