import { FlexRow, FlexCell, Text, IconContainer, Button, FlexSpacer } from '@epam/uui';
import { ReactComponent as PlacehoderIcon } from '../../icons/portfolio-placehoder.svg';
import { ReactComponent as PlusIcon } from '@epam/assets/icons/action-add-fill.svg';

import css from './PortfolioPlacehoder.module.scss';

const LABELS = {
  text: 'Create first Portfolio',
  button: 'Create a portfolio',
};

interface IPortfolioPlacehoderProps {
  onCreateClick: () => void
}

export function PortfolioPlacehoder({ onCreateClick }: IPortfolioPlacehoderProps) {

  return (
    <FlexCell cx={css.root}>
      <FlexSpacer />
      <FlexRow>
        <div style={{ textAlign: "center" }}>
          <FlexRow>
            <IconContainer icon={PlacehoderIcon} />
          </FlexRow>
          <FlexRow cx={css.labelContainer}>
            <FlexSpacer />
            <Text fontSize="24" fontWeight="600" lineHeight="30" > {LABELS.text}</Text>
            {/* <Text cx={css.label}> { LABELS.Text }</Text> */}
            <FlexSpacer />
          </FlexRow>
          <FlexRow>
            <FlexSpacer />
            <Button icon={PlusIcon} caption={LABELS.button} color="primary" onClick={onCreateClick} />
            <FlexSpacer />
          </FlexRow>
        </div>
      </FlexRow>
      <FlexSpacer />
    </FlexCell>
  );
}
