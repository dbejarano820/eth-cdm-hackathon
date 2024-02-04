export const BLOCKCHAINS = ['Avalanche', 'Ethereum', 'Vara', 'Starknet'];

interface BlockchainImagesMap {
  [key: string]: string;
}

export const blockchainImages: BlockchainImagesMap = {
  Ethereum: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=002',
  Avalanche: 'https://cryptologos.cc/logos/avalanche-avax-logo.png?v=029',
  Vara: 'https://i.ibb.co/TTKGKPW/favicon-V2.png',
  Starknet:
    'https://pbs.twimg.com/profile_images/1656626805816565763/WyFDMG6u_400x400.png'
};

export const ESCROW_MAP = {
  Avalanche: '0x123456789',
  Vara: '0x12345678'
};
