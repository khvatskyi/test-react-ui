import {
  FlexCell, FlexRow, FlexSpacer, Panel, LabeledInput, RichTextView, TextInput, TextArea,
  PickerInput, RadioGroup
} from '@epam/uui';
import { IFormApi, useArrayDataSource } from '@epam/uui-core';

import { IProfileInfo } from '../Profile.models';
import { appData } from '../../../data/source';
import css from './ProfileForm.module.scss';

interface IProfileFormProps {
  form: IFormApi<IProfileInfo>
}

export function ProfileForm({ form: { lens } }: IProfileFormProps) {

  const industryDataSource = useArrayDataSource(
    {
      items: appData.industries
    },
    []
  );

  return (
    <div className={css.rootForm}>
      <FlexCell width="100%">
        <RichTextView >
          <h2 style={{ textAlign: "center" }}>Add client profile</h2>
        </RichTextView>
        <FlexSpacer />
      </FlexCell>
      <Panel cx={css.formPanel} >
        <FlexCell width="100%">
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="companyName" label="Name" maxLength={72} charCounter={true} {...lens.prop('name').toProps()}>
                <TextInput {...lens.prop('name').toProps()} id="companyName" placeholder="Please type text" maxLength={72} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="companyDescription" label="Description" {...lens.prop('description').toProps()}>
                <TextArea {...lens.prop('description').toProps()} id="companyDescription" placeholder="Please type text" />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="24">
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
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor={'companySize'} label="Size" {...lens.prop('size').toProps()}>
                <RadioGroup
                  {...lens.prop('size').toProps()}
                  name="companySize"
                  items={[
                    { id: 'Small', name: 'Small' }, { id: 'Medium', name: 'Medium' }, { id: 'Large', name: 'Large' },
                  ]}
                  direction="horizontal"
                />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding="24">
            <FlexCell minWidth={324} width="100%">
              <LabeledInput htmlFor="coreProducts" label="Core products / Business lines" info="Core products / Business lines" isOptional={true} {...lens.prop('coreProducts').toProps()}>
                <TextArea {...lens.prop('coreProducts').toProps()} id="coreProducts" placeholder="Please type text" />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
        </FlexCell>
      </Panel>
    </div>
  )
}
