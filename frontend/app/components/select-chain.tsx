import { Select, SelectItem } from '@tremor/react';
import { BLOCKCHAINS } from '../constants';

interface SelectChainProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}

export function SelectChain({ value, setValue, disabled }: SelectChainProps) {
  return (
    <>
      <div className="max-w-sm mx-auto space-y-6">
        <Select
          disabled={disabled}
          value={value}
          placeholder="Elija la red"
          onValueChange={(selectedValue) => setValue(selectedValue)}
        >
          {BLOCKCHAINS.map((blockchain: string) => (
            <SelectItem key={blockchain} value={blockchain}>
              {blockchain}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}
