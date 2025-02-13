import { IModal, useUuiContext } from '@epam/uui-core';
import { Button, FlexRow, ModalBlocker, ModalFooter, ModalHeader, ModalWindow, Panel, FlexSpacer, RichTextView } from '@epam/uui';
import css from './ResetProgressButton.module.scss';

interface IConfirmModalProps extends IModal<string> {
  onResetClick: () => void;
  stageName: string;
}

interface IConfirmProps {
  onResetClick: () => void;
  stageName: string;
}

export function ResetProgressButton( {onResetClick, stageName} : IConfirmProps) {
  const { uuiModals } = useUuiContext();

  const handleOnResetClick = () => {
    uuiModals
      .show<string>((props) => <ResetProgressButtonModal {...props} onResetClick={onResetClick} stageName={stageName}/>)
      .then(onResetClick)
      .catch(() => {});
  };

  return (
    <Button caption='Reset progress' color='critical' fill='outline' onClick={handleOnResetClick} />
  );
}

function ResetProgressButtonModal(modalProps: IConfirmModalProps) {

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow width='590px'>
        <Panel background="surface-main">
          <ModalHeader title="Reset progress?" onClose={() => modalProps.abort()} />
          <FlexRow padding="24">
            <RichTextView size='16'>
              <span>Do you want to reset all your progress for</span>
              {' '}
              <b>[{modalProps.stageName}]</b>
              {' '}
              <span>module and start over?</span>
            </RichTextView>
          </FlexRow>
          <ModalFooter cx={css.footer}>
            <FlexRow columnGap={12} cx={css.buttonPanel}>
              <FlexSpacer />
              <Button color="secondary" fill="outline" caption="Cancel" onClick={() => modalProps.abort()} />
              <Button color="critical" caption="Reset progress" onClick={() => modalProps.success(null)} />
            </FlexRow>
          </ModalFooter>
        </Panel>
      </ModalWindow>
    </ModalBlocker>
  );
}
