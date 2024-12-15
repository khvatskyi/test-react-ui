import {
  FlexCell, FlexRow, FlexSpacer, Panel, LabeledInput, RichTextView, TextInput, TextArea,
  PickerInput, RadioGroup
} from '@epam/uui';
import { IFormApi, useArrayDataSource } from '@epam/uui-core';
import { useState } from 'react';

import { IProfileInfo } from '../Profile.models';
import { appData } from '../../../data/source';
import css from './ProfileForm.module.scss';

interface IProfileFormProps {
  defaultData: IProfileInfo;
  form: IFormApi<IProfileInfo>
}

export function ProfileForm({ defaultData, form: { lens } }: IProfileFormProps) {
  const industryDataSource = useArrayDataSource(
    {
      items: appData.industries
    },
    []
  );
  const [size, setSize] = useState<string | null>(defaultData.size);

  return (
    <div className={css.rootForm}>
      <FlexCell width="100%">
        <RichTextView >
          <h2 style={{ textAlign: "center" }}>Client Profile</h2>
          <div style={{ textAlign: "center" }}>Tell us a little bit about the client you are working with</div>
        </RichTextView>
        <FlexSpacer />
      </FlexCell>
      <Panel cx={css.formPanel} >
        <FlexCell width="100%">
          <FlexRow vPadding="12">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="companyName" label="Provider Name" info="Please enter your company name" {...lens.prop('name').toProps()}>
                <TextInput {...lens.prop('name').toProps()} id="companyName" placeholder="Company Name" />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="12">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="companyDescription" label="Description" {...lens.prop('description').toProps()}>
                <TextArea {...lens.prop('description').toProps()} id="companyDescription" placeholder="Company Description" />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow>
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor={'companyIndustry'} label="Industry" {...lens.prop('industry').toProps()}>
                <PickerInput
                  {...lens.prop('industry').toProps()}
                  dataSource={industryDataSource}
                  selectionMode="single"
                  getName={(item) => item!.industry}
                  valueType="id"
                  id={'companyIndustry'}
                  placeholder="Please select"
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow>
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor={'companySize'} label="Size" {...lens.prop('size').toProps()}>
                <RadioGroup
                  name="companySize"
                  items={[
                    { id: 'small', name: 'Small' }, { id: 'medium', name: 'Medium' }, { id: 'large', name: 'Large' },
                  ]}
                  value={size}
                  onValueChange={setSize}
                  direction="horizontal"
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="12">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="coreProducts" label="Core products / Business lines" info="Core products / Business lines" {...lens.prop('coreProducts').toProps()}>
                <TextArea {...lens.prop('coreProducts').toProps()} id="coreProducts" placeholder="Enter a text" />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
        </FlexCell>
      </Panel>
    </div>
  )
}
