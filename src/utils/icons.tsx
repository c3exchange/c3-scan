import Icon from '../components/Icon/Icon';

export const getAssetIcon = (unitName?: string, size = 24) => {
  switch (unitName) {
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
    default:
      return <Icon name="usdc" height={size} width={size} />;
  }
};
