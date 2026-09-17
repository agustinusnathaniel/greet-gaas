import { Dialog, Portal } from '@chakra-ui/react';
import type * as React from 'react';

export type ModalWrapperProps = {
  open: boolean;
  onClose: () => void;
  closeOnInteractOutside?: boolean;
  size?: string;
  header?: React.ReactNode;
  withCloseButton?: boolean;
  body?: React.ReactNode;
  footer?: React.ReactNode;
} & {
  isOpen?: never;
  onOpenChange?: never;
};

const ModalWrapper = ({
  open,
  size,
  header,
  withCloseButton = true,
  body,
  footer,
  closeOnInteractOutside = false,
  onClose,
}: ModalWrapperProps) => {
  return (
    <Dialog.Root
      open={open}
      size={size === 'xs' ? 'xs' : 'md'}
      onOpenChange={(e) => {
        if (!e.open) {
          onClose();
        }
      }}
      placement="center"
      closeOnInteractOutside={closeOnInteractOutside}
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content margin={6} padding={2} borderRadius={24}>
            {header && (
              <Dialog.Header
                fontWeight="black"
                fontSize={{ base: '2xl', lg: '3xl' }}
              >
                {header}
              </Dialog.Header>
            )}
            {withCloseButton && <Dialog.CloseTrigger />}

            {body && <Dialog.Body>{body}</Dialog.Body>}

            {footer && <Dialog.Footer gridGap={2}>{footer}</Dialog.Footer>}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ModalWrapper;
