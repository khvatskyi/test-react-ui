import { FlexRow, Button, FlexSpacer, IconContainer, Text, Panel } from '@epam/uui';
import { ReactComponent as ErrorIcon } from '@epam/assets/icons/notification-error-fill.svg';
import { ReactComponent as iconRefresh } from '@epam/assets/icons/navigation-refresh-outline.svg';

import css from './ChatAiError.module.scss';


export interface IChatAiErrorProps {
  onClick: () => void;
}

export default function ChatAiError({ onClick: handleClick }: IChatAiErrorProps) {
  return (<>
    <FlexRow vPadding='12'>
      <FlexSpacer />
      <Panel background='surface-main' cx={css.panelQuestion}>
        <FlexRow cx={css.root} alignItems='top'>
          <IconContainer cx={css.iconWrapper} icon={ErrorIcon} size={54} />
          <div>
            <h4 style={{marginBottom: '6px', marginTop: '0px'}}>Attempt Failed</h4>
            <Text size='36' fontSize='14' rawProps={ { style: { padding: '0px' } } }>
              We couldn't process your request due to invalid responses provided by the AI Assistant.
            </Text>
            <Text size='36' fontSize='14' rawProps={ { style: { padding: '0px' } } }>
              Please try again.
            </Text>
          </div>
        </FlexRow>
      <FlexRow>
        <FlexSpacer />
        <Button color="primary" caption="Retry" onClick={ handleClick } icon={iconRefresh}/>
      </FlexRow>
      </Panel>
    </FlexRow>
  </>);
}