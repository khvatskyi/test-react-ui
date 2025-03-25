import { useUuiContext } from '@epam/uui-core';
import { Button, ErrorNotification, FlexRow, FlexSpacer, SuccessNotification, Text } from '@epam/uui';
import { ReactComponent as iconRefresh } from '@epam/assets/icons/navigation-refresh-outline.svg';


export enum ERROR_MESSAGES {
  InvalidAiResponse  = 'We couldn\'t process your request due to invalid responses provided by the AI Assistant. Please try again.',
}

 
export const isInvalidGeneratedResponse = (message: string) => {
    const C_FAILED_MESSAGE = 'failed to generate a valid response';
    return message.toLowerCase().includes(C_FAILED_MESSAGE);
 }

 
export const useShowErrorNotification = () => {
  const { uuiNotifications } = useUuiContext();

  const showErrorNotification = (message: string) => {
      uuiNotifications.show(
        (props) => (
          <ErrorNotification {...props}>
            <Text size='36' fontSize='14'>
              {message}
            </Text>
          </ErrorNotification>
        ),
        { duration: 10 },
      ).catch(() => null);
    
  };

  return showErrorNotification;
}

export const useShowErrorRetryNotification = () => {
  const { uuiNotifications } = useUuiContext();

  const showErrorNotification = (onRetry: () => void) => {
      uuiNotifications.show(
        (props) => (
          <ErrorNotification {...props}>
            <h4 style={{marginBottom: '6px', marginTop: '6px'}}>Attempt Failed</h4>
            <Text size='36' fontSize='14' rawProps={ { style: { padding: '0px' } } }>
              We couldn't process your request due to invalid responses provided by the AI Assistant.
            </Text>
            <Text size='36' fontSize='14' rawProps={ { style: { padding: '0px' } } }>
              Please try again.
            </Text>
            <FlexRow padding="24" vPadding="24" columnGap="12" rawProps={ { style: { width: '100%' } } }>
                <FlexSpacer />
                <Button color="primary" caption="Retry" onClick={ props.onSuccess } icon={iconRefresh}/>
            </FlexRow>
          </ErrorNotification>
        ),
        { duration: 10 },
      )
      .then(onRetry)
      .catch(() => null);    
  };

  return showErrorNotification;
}



export const useShowSuccessNotification = () => {
  const { uuiNotifications } = useUuiContext();

  const showErrorNotification = (message: string) => {
      uuiNotifications.show(
        (props) => (
          <SuccessNotification {...props}>
            <Text size='36' fontSize='14'>
            {message}
            </Text>
          </SuccessNotification>
        ),
        { duration: 5 },
      ).catch(() => null);
    
  };

  return showErrorNotification;
}




