import { IModal, useUuiContext } from '@epam/uui-core';
import { Button, FlexRow, ModalBlocker, ModalFooter, ModalHeader, ModalWindow, Panel, RichTextView } from '@epam/uui';
import { ScrollBars } from '@epam/uui-components';

interface IConfirmModalProps extends IModal<string> {
  onClick: () => void;
  summaryObject: any;
}

interface IConfirmProps {
  onClick: () => void;
  summaryObject: any;
}

export function ViewSummaryButton( {onClick, summaryObject} : IConfirmProps) {
  const { uuiModals } = useUuiContext();

  const handleOnClick = () => {
    uuiModals
      .show<string>((props) => <ViewSummaryButtonModal {...props} onClick={onClick} summaryObject={summaryObject} />)
      .then(onClick)
      .catch(() => {});
  };

  return (
    <Button caption="View summary" color='primary'onClick={handleOnClick} />
  );
}


function ViewSummaryButtonModal(modalProps: IConfirmModalProps) {

  return (
    <ModalBlocker {...modalProps}>
      <ModalWindow width='590px' height="100%">
        <Panel background="surface-main">
          <ModalHeader title="View summary" onClose={() => modalProps.abort()} />
          <ScrollBars>
          {Object.entries(modalProps.summaryObject)
              .map(([key, value], index) => { 
                return (
                  <>
                    <FlexRow  rawProps={ { style: { paddingLeft: '12px', paddingRight: '12px' } } }>
                      <h4>{key}</h4>
                    </FlexRow>
                    <FlexRow  rawProps={ { style: { paddingLeft: '12px', paddingRight: '12px' } } }>
                    <RichTextView >
                      {JSON.stringify(value)}
                      </RichTextView>
                    </FlexRow>
                  </>
                )
              })
            } 
            </ScrollBars>
          <ModalFooter>
          </ModalFooter>
        </Panel>        
      </ModalWindow>
    </ModalBlocker>
  );
}
