import { IModal, useUuiContext } from '@epam/uui-core';
import { Button, ModalBlocker, ModalHeader, ModalWindow, Panel, RichTextView } from '@epam/uui';
import { ScrollBars } from '@epam/uui-components';

import css from './ViewSummaryButton.module.scss';

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
      <ModalWindow width='590px' height="100%" >
        <div style={{
              position: 'fixed', 
              top: '0px', 
              right:'0px',
              bottom: '0px', 
              border: 'none', 
              height: '100%', 
              zIndex: 1000000, 
              width: '900px'
              }}
              >
          <Panel background="surface-main" cx={css.content} >
            <ModalHeader cx={css.header} title="Summary" onClose={() => modalProps.abort()} />
              <ScrollBars hasTopShadow hasBottomShadow >
                <div className={css.scroll}>
                  {Object.entries(modalProps.summaryObject)
                      .map(([key, value], index) => { 
                        const isArray = Array.isArray(value);
                        return (
                          <>
                            <h4>{key}</h4>
                            {isArray 
                              ? value.map((value) => {
                                return <RichTextView size='16' > {` - ${value}`}</RichTextView>
                              })
                              : <RichTextView size='16' > {`${value}`}</RichTextView>
                            }
                          </>
                        )
                      })
                    } 
                </div>
              </ScrollBars>
            <Panel background="surface-main" cx={css.footer} ></Panel>
          </Panel>
        </div>
      </ModalWindow>
    </ModalBlocker>
  );
}
