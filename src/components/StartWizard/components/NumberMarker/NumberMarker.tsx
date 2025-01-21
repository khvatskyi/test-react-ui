import { cx } from '@epam/uui-core';
import css from './NumberMarker.module.scss';
import { IconContainer } from '@epam/uui-components';
import { ReactComponent as checkIcon } from '@epam/assets/icons/notification-check-fill.svg';

export interface INumberMarkerProps {
  step: number;
  activeStep: number;
}

export default function NumberMarker({ step, activeStep }: INumberMarkerProps) {
  const isActive = step === activeStep
  const isPassed = step < activeStep
  return (
    <>
      { isPassed &&
        <IconContainer icon={checkIcon} size='42'/>
      }
      { !isPassed &&
      <div className={ cx(css.circle, isActive && css.activeBorder, !isActive && css.disableBorder) }>
        <div className={ cx(css.number, isActive && css.activeNumber, !isActive && css.disableNumber) }>
          {step}
        </div>
      </div>}
    </>
  );
};