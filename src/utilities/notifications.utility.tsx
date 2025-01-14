import { useUuiContext } from '@epam/uui-core';
import { ErrorNotification, SuccessNotification, Text } from '@epam/uui';


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




