import React from 'react';
import { IModal, useUuiContext } from '@epam/uui-core';
import { Button, ModalBlocker, ModalHeader, ModalWindow, Panel, RichTextView } from '@epam/uui';
import { ScrollBars } from '@epam/uui-components';

import css from './SummaryViewButton.module.scss';

interface IConfirmModalProps extends IModal<string> {
  onClick: () => void;
  summaryObject: any;
}

interface IConfirmProps {
  onClick: () => void;
  summaryObject: any;
}

export function SummaryViewButton( {onClick, summaryObject} : IConfirmProps) {
  const { uuiModals } = useUuiContext();

  const handleOnClick = () => {
    uuiModals
      .show<string>((props) => <SummaryViewButtonModal {...props} onClick={onClick} summaryObject={summaryObject} />)
      .then(onClick)
      .catch(() => {});
  };

  return (
    <Button caption="View summary" color='primary'onClick={handleOnClick} />
  );
}


function SummaryViewButtonModal(modalProps: IConfirmModalProps) {

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
                    <RecursiveContent data={modalProps.summaryObject} />;
                </div>
              </ScrollBars>
            <Panel background="surface-main" cx={css.footer} ></Panel>
          </Panel>
        </div>
      </ModalWindow>
    </ModalBlocker>
  );
}


const RecursiveContent = ({ data }) => {
  const renderContent = (indent, value, key = null) => {
    const indent_step = 20;
    const rawStyle = { marginLeft: `${indent}px` };
    const rawPropsStyle = { style: rawStyle};
    if (Array.isArray(value)) {
      return (
        <>
          {key && <h4 style={rawStyle}>{key}</h4>}
          {value.map((item, index) => (
            <React.Fragment key={index}>
              {typeof item === 'object' ? renderContent(indent + indent_step, item) : <RichTextView rawProps={rawPropsStyle} size='16'>{` - ${item}`}</RichTextView>}
            </React.Fragment>
          ))}
        </>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <>
          {key && <h4 style={rawStyle}>{key}</h4>}
          {Object.entries(value).map(([subkey, subvalue], index) => (
            <div key={index}>
              {renderContent(indent + indent_step, subvalue, subkey)}
            </div>
          ))}
        </>
      );
    } else {
      return (
        key
        ? <>
            <h4 style={rawStyle}>{key}</h4>
            <RichTextView  rawProps={rawPropsStyle} size='16'>{`${value}`}</RichTextView>
          </>
        :<RichTextView  rawProps={rawPropsStyle} size='16'>{value}</RichTextView>
      );
    }
  };

  return (
    <div>
      {Object.entries(data).map(([key, value], index) => (
        <React.Fragment key={index}>
          {renderContent(0, value, key)}
        </React.Fragment>
      ))}
    </div>
  );
};