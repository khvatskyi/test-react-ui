import { FlexRow } from '@epam/uui-components';
import css from './SummaryViewTitle.module.scss';

interface ISummaryViewTitleProps {
  title: string;
  marginTop?: number;
}

export function SummaryViewTitle( {title, marginTop = 0} : ISummaryViewTitleProps) {

  return (
    <FlexRow cx={css.titleLine} rawProps={{ style: {marginTop: `${marginTop}px`}}}>
      <h3 className={css.title}>{title}</h3>
    </FlexRow>
  );
}
