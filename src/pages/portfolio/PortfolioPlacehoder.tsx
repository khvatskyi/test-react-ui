// import React, { useState } from 'react';
// import { UuiContexts, useUuiContext } from '@epam/uui-core';
// import type { TApi } from '../../data';
// import { ILens, useArrayDataSource } from '@epam/uui-core';
import {
  FlexRow, FlexCell, Text, IconContainer, Button, FlexSpacer,
  // , Panel, LabeledInput, RichTextView, TextInput, SuccessNotification, TextArea, 
  // PickerInput, RadioGroup, useForm
} from '@epam/uui';
import { ReactComponent as PlacehoderIcon } from '../../icons/portfolio-placehoder.svg';
import { ReactComponent as PlusIcon } from '@epam/assets/icons/action-add-fill.svg';

import css from './PortfolioPlacehoder.module.scss';

const LABELS = {
  Text: 'Create first Portfolio',
  Button: 'Create a portfolio',
};


export function PortfolioPlacehoder() {

  const createPortfolio = () => {
    alert('createPortfolio');
  };

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
            <Text fontSize="24" fontWeight="600" lineHeight="30" > {LABELS.Text}</Text>
            {/* <Text cx={css.label}> { LABELS.Text }</Text> */}
            <FlexSpacer />
          </FlexRow>
          <FlexRow>
            <FlexSpacer />
            <Button icon={PlusIcon} caption={LABELS.Button} color="primary" onClick={createPortfolio} />
            <FlexSpacer />
          </FlexRow>
        </div>
      </FlexRow>
      <FlexSpacer />
    </FlexCell>
  );
}
