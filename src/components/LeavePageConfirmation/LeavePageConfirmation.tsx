import { IModal } from '@epam/uui-core';
import { Button, FlexRow, ModalBlocker, ModalFooter, ModalHeader, ModalWindow, Panel, FlexSpacer, RichTextView } from '@epam/uui';
import css from './LeavePageConfirmation.module.scss';


export function LeavePageConfirmation(modalProps: IModal<boolean>) {

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
