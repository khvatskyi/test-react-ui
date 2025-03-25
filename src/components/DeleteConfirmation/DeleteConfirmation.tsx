import * as React from 'react';
import { IModal } from '@epam/uui-core';
import { Button, FlexRow, ModalBlocker, ModalFooter, ModalHeader, ModalWindow, Panel, FlexSpacer, RichTextView } from '@epam/uui';
import css from './DeleteConfirmation.module.scss';


export interface IConfirmationData extends IModal<boolean> {  
  message?: string;
  element?: React.ReactNode;
}

export function DeleteConfirmation(modalProps: IConfirmationData) {

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow width='590px'>
        <Panel background="surface-main">
          <ModalHeader title="Confirmation" onClose={() => modalProps.abort()} />
          <FlexRow padding="24">
            {modalProps.message && <RichTextView size='16'>{modalProps.message}</RichTextView>}
            {modalProps.element}
          </FlexRow>
          <ModalFooter cx={css.footer}>
            <FlexRow columnGap={12} cx={css.buttonPanel}>
              <FlexSpacer />
              <Button color="secondary" fill="outline" caption="Cancel" onClick={() => modalProps.abort()} />
              <Button color="critical" caption="Delete" onClick={() => modalProps.success(null)} />
            </FlexRow>
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
