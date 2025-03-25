import { Panel, ScrollBars, FlexRow, FlexSpacer } from '@epam/uui';
import css from './ChatViewSummary.module.scss';
import { getStateTitle, normalizeSummaryKey, normalizeSummaryKeys, STATE_CODES } from '../../pages/PortfolioStages/components/PortfolioStagesLeftPanel/structure';
import React from 'react';
import TextValueEditor from '../../components/Editors/TextValueEditor/TextValueEditor';
import TextArrayValueEditor from '../../components/Editors/TextArrayValueEditor/TextArrayValueEditor';
import { SummaryExportButton } from '../../components/SummaryExportButton/SummaryExportButton';
import { useAppDispatch } from '../../hooks';
import { IUpdateChatSummaryValueRequest } from '../../typings/models/module.models';
import { updateChatSummaryValue } from '../../store/ai.slice';

const LABELS = {
  formTitle: 'Summary',
}


export interface IChatViewSummaryProps {
  portfolioId: string;
  stateCode: STATE_CODES;
  summaryObject: any;
  title?: string;
  description?: string;
}

export default function ChatViewSummary({ portfolioId, stateCode, summaryObject, title, description }: IChatViewSummaryProps) {
  
  const dispatch = useAppDispatch();

  const handleEditValue = (key: string, newValue: any) => {
    const data: IUpdateChatSummaryValueRequest = {
      portfolioId: portfolioId,
      stateCode: stateCode,
      topic: getStateTitle(stateCode),
      key: key,
      value: newValue,
    }

    dispatch(updateChatSummaryValue(data));
  }    

  const renderContent = (key: string, value: any, indent: number) => {
    const indentStep = 20;
    const style = { marginLeft: `${indent}px` };

    if (Array.isArray(value)) { //array
      if (value.every(item => typeof item === 'string')) { // array of strings
        return (
          <div key={key} style={style}>
            <h4 className={css.keyCaption}>{normalizeSummaryKey(key)}</h4>
            <TextArrayValueEditor id={`${key}`} value={value} onEditValue={handleEditValue} />
          </div>
        )
      } else {
        return (
          <div key={key} style={style}>
            <h4 className={css.keyCaption}>{normalizeSummaryKey(key)}</h4>
            {value.map((item, index) => (
              <React.Fragment key={index}>
                {typeof item === 'object' 
                  ? renderContent(null, item, indent + indentStep)
                  : <TextArrayValueEditor id={`${key}[${index}]`} value={item} onEditValue={handleEditValue} />
                }
              </React.Fragment>
            ))}
          </div>
        );
      }
    } else if (typeof value === 'object' && value !== null) {
      // object
      return (
        <div key={key} style={style}>
          <h4 className={css.keyCaption}>{normalizeSummaryKey(key)}</h4>
          {Object.entries(value).map(([subkey, subvalue]) => (
            <React.Fragment key={subkey}>
              {renderContent(subkey, subvalue, indent + indentStep)}
            </React.Fragment>
          ))}
        </div>
      );
    } else {
      // regular value
      return (
        <div key={key} style={style}>
          {key && <h4 className={css.keyCaption}>{normalizeSummaryKey(key)}</h4>}
          <TextValueEditor id={key} value={String(value)} onEditValue={handleEditValue} />
        </div>
      );
    }
  };


  return summaryObject && (
    <div className={css.content}>
      <ScrollBars>
        <div className={css.rootForm}>
          <Panel cx={css.formPanel} background='surface-main'>
            <FlexRow columnGap='12' cx={css.titleForm}>
              <h3 style={{ margin: '0px' }}>{title ? title : LABELS.formTitle }</h3>
              <FlexSpacer />
              <SummaryExportButton summaryObject={normalizeSummaryKeys(summaryObject)} />
            </FlexRow>
            {description && 
              <FlexRow columnGap='12' cx={css.titleForm}>
                <h2 style={{ margin: '0px' }}>{description }</h2>
              </FlexRow>
            }
            <div className={css.scroll}>
              {Object.entries(summaryObject).map(([key, value]) =>
                renderContent(key, value, 0)
              )}
            </div>
          </Panel>
        </div>
      </ScrollBars>
    </div>
  );
}
