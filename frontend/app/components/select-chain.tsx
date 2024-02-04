import { Select, SelectItem } from '@tremor/react';
import { BLOCKCHAINS, blockchainImages } from '../constants';

interface SelectChainProps {
  value: string;
  setValue: (value: string) => void;
  disabled?: boolean;
}

export function SelectChain({ value, setValue, disabled }: SelectChainProps) {
  const imageStyle = {
    width: '25px',
    height: '25px',
    marginRight: '10px'
  };

  return (
    <>
      <div className="max-w-sm mx-auto space-y-6">
        <Select
          disabled={disabled}
          value={value}
          placeholder="Select payment method"
          onValueChange={(selectedValue) => setValue(selectedValue)}
        >
          {BLOCKCHAINS.map((blockchain: string) => (
            <SelectItem key={blockchain} value={blockchain}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={blockchainImages[blockchain]}
                  alt={`${blockchain} Logo`}
                  style={{ ...imageStyle, marginRight: '5px' }}
                />
                <span>{blockchain}</span>
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}
