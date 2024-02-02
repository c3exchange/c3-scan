import Icon from '../components/Icon/Icon';

enum Asset {
  USDC = 'USDC',
  BTC = 'BTC',
  ETH = 'ETH',
  ALGO = 'ALGO',
  AVAX = 'AVAX',
  ARB = 'ARB',
  BNB = 'BNB',
}
interface Patterns {
  [key: string]: RegExp;
}
export const getAssetIcon = (unitName?: string, size = 24) => {
  let regex, match;
  const patterns: Patterns = {
    [Asset.USDC]: new RegExp(Asset.USDC, 'i'),
    [Asset.BTC]: new RegExp(Asset.BTC, 'i'),
    [Asset.ETH]: new RegExp(Asset.ETH, 'i'),
    [Asset.ALGO]: new RegExp(Asset.ALGO, 'i'),
    [Asset.AVAX]: new RegExp(Asset.AVAX, 'i'),
    [Asset.ARB]: new RegExp(Asset.ARB, 'i'),
    [Asset.BNB]: new RegExp(Asset.BNB, 'i'),
  };
  for (const asset in patterns) {
    regex = patterns[asset];
    match = unitName ? unitName.match(regex) : null;
    if (match) {
      switch (asset) {
        case 'USDC':
          return <Icon name="usdc" height={size} width={size} />;
        case 'BTC':
          return <Icon name="btc" height={size} width={size} />;
        case 'ETH':
          return <Icon name="eth" height={size} width={size} />;
        case 'ALGO':
          return <Icon name="algo" height={size} width={size} />;
        case 'AVAX':
          return <Icon name="avax" height={size} width={size} />;
        case 'ARB':
          return <Icon name="arbitrum" height={size} width={size} />;
        case 'BNB':
          return <Icon name="bnb" height={size} width={size} />;
      }
    }
  }

  return <Icon name="usdc" height={size} width={size} />;
};
