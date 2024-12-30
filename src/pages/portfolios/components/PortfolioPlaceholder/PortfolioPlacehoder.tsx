import { FlexRow, FlexCell, Text, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as PlusIcon } from '@epam/assets/icons/action-add-fill.svg';

import css from './PortfolioPlacehoder.module.scss';

const LABELS = {
  text: 'Create first Portfolio',
  button: 'Create a portfolio',
};

export interface IPortfolioPlacehoderProps {
  onCreateClick: () => void
}

export default function PortfolioPlacehoder({ onCreateClick }: IPortfolioPlacehoderProps) {

  return (
    <FlexCell cx={css.root} width='100%'>
      <FlexSpacer />
      <FlexRow>
        <div style={{ textAlign: 'center' }}>
          <FlexRow>
            <img src='/icons/portfolio-placehoder.svg' alt=''></img>
          </FlexRow>
          <FlexRow cx={css.labelContainer}>
            <FlexSpacer />
            <Text fontSize='24' fontWeight='600' lineHeight='30' > {LABELS.text}</Text>
            <FlexSpacer />
          </FlexRow>
          <FlexRow>
            <FlexSpacer />
            <Button icon={PlusIcon} caption={LABELS.button} color='primary' onClick={onCreateClick} />
            <FlexSpacer />
          </FlexRow>
        </div>
      </FlexRow>
      <FlexSpacer />
    </FlexCell>
  );
}
