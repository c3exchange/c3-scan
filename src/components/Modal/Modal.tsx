import { useContext, useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ModalContext } from '../../hooks/useModal';
import { useWindowSize } from '../../hooks/useWindowSize';
import { breakpoints } from '../../theme';
import { MOBILE_HEADER_HEIGHT } from '../../constants/constants';

import * as S from './styles';
import Icon from '../Icon/Icon';

const Modal = () => {
  const windowSize = useWindowSize();
  const context = useContext(ModalContext);
  const [allHeight, setAllHeight] = useState<boolean>(false);

  const mobileCondition = useMemo(
    () => windowSize.width < breakpoints.laptop,
    [windowSize.width]
  );

  const handlers = useSwipeable({
    onSwipedDown: () => close(),
  });

  if (!context) return <></>;

  const { isMobile, isOpen, content, background, close, isLocked } = context;
  const onClose = () => !isLocked && close();

  const contentRef = (instance: HTMLDivElement) => {
    if (instance) {
      const { children } = instance;
      let height = MOBILE_HEADER_HEIGHT;
      for (let i = 0; i < children.length; i++) {
        height += children[i].scrollHeight;
      }
      setAllHeight(height >= window.innerHeight);
    }
  };

  return (
    <S.ReactModal
      contentRef={contentRef}
      isOpen={isOpen}
      ariaHideApp={false}
      overlayElement={(props, contentElement) => (
        <S.Overlay {...props}>{contentElement}</S.Overlay>
      )}
      onRequestClose={onClose}
      _mobile={isMobile}
      _allheight={allHeight}
      _background={background}
    >
      <S.ModalHeader {...handlers} _mobile={isMobile}>
        {mobileCondition || isMobile ? (
          <S.CloseLine />
        ) : (
          <S.CloseButton onClick={close}>
            <Icon name="closeHamburger" height={15} width={15} />
          </S.CloseButton>
        )}
      </S.ModalHeader>
      <S.ModalContent _allheight={allHeight}>{content}</S.ModalContent>
    </S.ReactModal>
  );
};

export default Modal;
