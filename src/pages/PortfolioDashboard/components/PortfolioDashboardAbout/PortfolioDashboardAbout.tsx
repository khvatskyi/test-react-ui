import { FlexCell, Text } from '@epam/uui';

import css from './PortfolioDashboardAbout.module.scss';

const LABELS = {
  title: 'About portfolio',
};

export interface IPortfolioDashboardAboutProps {
  onCreateClick: () => void
}

export default function PortfolioDashboardAbout({ onCreateClick }: IPortfolioDashboardAboutProps) {

  return (
    <FlexCell cx={css.root} width='100%'>
      <Text fontSize='24' fontWeight='600' lineHeight='30' > {LABELS.title}</Text>
    </FlexCell>
  );
}
