import { FlexRow, FlexSpacer, Spinner } from '@epam/uui';
import css from './DataLoading.module.scss';


export default function DataLoading() {
    return (
      <FlexRow cx={css.root} >
        <FlexSpacer />
            <Spinner />
        <FlexSpacer />
      </FlexRow>
    );
}