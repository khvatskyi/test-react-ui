import { IModal, useUuiContext } from '@epam/uui-core';
import { Button, FlexRow, ModalBlocker, ModalFooter, ModalHeader, ModalWindow, Panel, FlexSpacer, RichTextView } from '@epam/uui';
import css from './FormCancelButton.module.scss';

interface IConfirmModalProps extends IModal<string> {
  onClick: () => void;
}

interface IConfirmProps {
  onClick: () => void;
  needConfirmation: () => boolean;
}

export function FormCancelButton( {onClick, needConfirmation} : IConfirmProps) {
  const { uuiModals } = useUuiContext();

  const handleOnClick = () => {
    if (needConfirmation() ) {
      uuiModals
        .show<string>((props) => <FormCancelButtonModal {...props} onClick={onClick} />)
        .then(onClick)
        .catch(() => {});
    } else {
      onClick()
    }
  };

  return (
    <Button caption='Cancel' color='white' onClick={handleOnClick} />
  );
}

function FormCancelButtonModal(modalProps: IConfirmModalProps) {

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow width='590px'>
        <Panel background="surface-main">
          <ModalHeader title="Unsaved changes" onClose={() => modalProps.abort()} />
          <FlexRow padding="24">
            <RichTextView size='16'>If you leave all entered information will be lost</RichTextView>
          </FlexRow>
          <ModalFooter cx={css.footer}>
            <FlexRow columnGap={12} cx={css.buttonPanel}>
              <FlexSpacer />
              <Button color="secondary" fill="outline" caption="Stay on page" onClick={() => modalProps.abort()} />
              <Button color="critical" caption="Leave" onClick={() => modalProps.success(null)} />
            </FlexRow>
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
