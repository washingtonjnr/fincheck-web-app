import { iconsMap } from "./iconsMap";
// Types
import { TransactionTypes } from "../../../../app/services/transactions/@type";

interface CategoryIconProps {
  type: TransactionTypes;
  category?: string;
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.EXPENSE | typeof iconsMap.INCOME)) ??
        "default"
    ] ?? iconsMap[type].default;

  return <Icon />;
}
