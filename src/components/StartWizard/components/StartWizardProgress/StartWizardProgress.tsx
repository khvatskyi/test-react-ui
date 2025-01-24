import { useEffect, useState } from 'react';

import {FlexRow, Text, ProgressBar, FlexSpacer} from '@epam/uui';

import css from './StartWizardProgress.module.scss';

const LABELS = {
  formCaption: 'Getting started',
  progressCaption: '% complete',
}

export interface IStartWizardForProps {
  activeStep: number;
}

export default function StartWizardProgress(props: IStartWizardForProps) {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressValue = 100 / 4 * (props.activeStep - 1);
    setProgress(progressValue);
  }, [props.activeStep]); 

  return (
    <>
      <FlexRow >
        <Text cx={css.formCaption}>{LABELS.formCaption}</Text>
        <FlexSpacer />
        <Text cx={css.progressCaption}> { progress } {LABELS.progressCaption} </Text>
      </FlexRow>
      <ProgressBar progress={ progress } hideLabel />
    </>
  );
}
