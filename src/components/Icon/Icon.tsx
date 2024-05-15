import { ReactComponent as Arbitrum } from '../../assets/icons/arbitrum.svg';
import { ReactComponent as BNB } from '../../assets/icons/bnb.svg';
import { ReactComponent as Avax } from '../../assets/icons/avax.svg';
import { ReactComponent as Usdc } from '../../assets/icons/usdc.svg';
import { ReactComponent as Bitcoin } from '../../assets/icons/wbtc.svg';
import { ReactComponent as Ethereum } from '../../assets/icons/ethereum.svg';
import { ReactComponent as Algo } from '../../assets/icons/algo.svg';
import { ReactComponent as Pyth } from '../../assets/icons/pyth.svg';
import { ReactComponent as Sol } from '../../assets/icons/solana.svg';
import { ReactComponent as W } from '../../assets/icons/w.svg';
import { ReactComponent as Reddit } from '../../assets/icons/reddit.svg';
import { ReactComponent as X } from '../../assets/icons/x.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';
import { ReactComponent as Discord } from '../../assets/icons/discord.svg';
import { ReactComponent as Github } from '../../assets/icons/github.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as Magnet } from '../../assets/icons/magnet.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/rightArrow.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Info } from '../../assets/icons/info-tooltip.svg';
import { ReactComponent as InfoFilled } from '../../assets/icons/info-tooltip-filled.svg';
import { ReactComponent as EmptyTable } from '../../assets/icons/empty-table.svg';
import { ReactComponent as EmptyEarnTable } from '../../assets/icons/empty-earn-table.svg';
import { ReactComponent as EmptyInfoAddress } from '../../assets/icons/empty-info-address.svg';
import { ReactComponent as CloseHamburger } from '../../assets/icons/close-hamburger.svg';
import { ReactComponent as Copy } from '../../assets/icons/copy.svg';
import { ReactComponent as ToastSuccess } from '../../assets/icons/toastSuccess.svg';
import { ReactComponent as ToastError } from '../../assets/icons/toastError.svg';
import { ReactComponent as BackArrow } from '../../assets/icons/back-arrow.svg';
import { ReactComponent as Paste } from '../../assets/icons/paste.svg';
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg';

export type IconName =
  | 'hamburger'
  | 'arbitrum'
  | 'avax'
  | 'bnb'
  | 'usdc'
  | 'algo'
  | 'pyth'
  | 'sol'
  | 'w'
  | 'reddit'
  | 'x'
  | 'discord'
  | 'github'
  | 'close'
  | 'btc'
  | 'magnet'
  | 'eth'
  | 'rightArrow'
  | 'search'
  | 'info'
  | 'infoFilled'
  | 'emptyTable'
  | 'emptyEarnTable'
  | 'closeHamburger'
  | 'copy'
  | 'toastSuccess'
  | 'toastError'
  | 'emptyInfoAddress'
  | 'backArrow'
  | 'paste'
  | 'refresh';

interface IIcon {
  name: IconName;
  height: number;
  width: number;
  color?: string;
  onClick?: () => void;
}

const Icon = ({ name, width, height, color, onClick }: IIcon) => {
  const childProps = { width, height, color, onClick };
  return {
    hamburger: <Hamburger {...childProps} />,
    arbitrum: <Arbitrum {...childProps} />,
    avax: <Avax {...childProps} />,
    pyth: <Pyth {...childProps} />,
    sol: <Sol {...childProps} />,
    w: <W {...childProps} />,
    bnb: <BNB {...childProps} />,
    usdc: <Usdc {...childProps} />,
    reddit: <Reddit {...childProps} />,
    x: <X {...childProps} />,
    discord: <Discord {...childProps} />,
    github: <Github {...childProps} />,
    close: <Close {...childProps} />,
    btc: <Bitcoin {...childProps} />,
    magnet: <Magnet {...childProps} />,
    eth: <Ethereum {...childProps} />,
    search: <Search {...childProps} />,
    backArrow: <BackArrow {...childProps} />,
    rightArrow: <RightArrow {...childProps} />,
    info: <Info {...childProps} />,
    infoFilled: <InfoFilled {...childProps} />,
    algo: <Algo {...childProps} />,
    emptyTable: <EmptyTable {...childProps} />,
    emptyEarnTable: <EmptyEarnTable {...childProps} />,
    closeHamburger: <CloseHamburger {...childProps} />,
    emptyInfoAddress: <EmptyInfoAddress {...childProps} />,
    copy: <Copy {...childProps} />,
    paste: <Paste {...childProps} />,
    toastSuccess: <ToastSuccess {...childProps} />,
    toastError: <ToastError {...childProps} />,
    refresh: <Refresh {...childProps} />,
  }[name];
};

export default Icon;
