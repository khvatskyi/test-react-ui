import React, { useState } from 'react';
import { UuiContexts, useUuiContext } from '@epam/uui-core';
import type { CompanyInfo} from './types';
import type { TApi } from '../../data';
import { ILens, useArrayDataSource } from '@epam/uui-core';
import { 
  FlexCell, FlexRow, FlexSpacer, Panel, LabeledInput, RichTextView, TextInput, SuccessNotification, Text, TextArea, Button, 
  PickerInput, RadioGroup, useForm 
} from '@epam/uui';
import { defaultData} from './defaultData';
import { companyInfoSchema } from './validationShema';
import css from './ProviderContext.module.scss';
import { appData } from '../../data/source';


export function ProviderContextForm() {
  const svc = useUuiContext<TApi, UuiContexts>();

  const industryDataSource = useArrayDataSource(
      {
          items: appData.industries,
      },
      [],
  );

  const [color, setColor] = useState<string | null>(null); //TODO: need redesign
  // const handleColorChange = (newValue: string | null) => {
  //   setColor(newValue);  // тепер це безпечно, оскільки setColor правильно типізований
  // };
  
  const { lens, save } = useForm<CompanyInfo>({
      settingsKey: 'provider-context-form',
      value: defaultData,
      getMetadata: companyInfoSchema,
      onSave: (person) => Promise.resolve({ form: person }),
      onSuccess: () => {
          svc.uuiNotifications.show(
              (props) => (
                  <SuccessNotification { ...props }>
                      <Text size="36" fontSize="14">
                          Data has been saved!
                      </Text>
                  </SuccessNotification>
              ),
              { duration: 2 },
          ).catch(() => null);
      },
  });
  const info: ILens<CompanyInfo> = lens;

  return (
      <div className={ css.root }>
          <FlexCell width="100%">
                <RichTextView >
                  <h2 style={{textAlign: "center"}}>Provider Context</h2>
                  <div style={{textAlign: "center"}}>Tell us a little bit about the company you are working with</div>
                </RichTextView>
                <FlexSpacer />
          </FlexCell>
          <Panel cx={ css.formPanel } >
              <FlexCell width="100%">
                <FlexRow vPadding="12">
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor="companyName" label="Provider Name" info="Please enter your company name" { ...info.prop('name').toProps() }>
                          <TextInput { ...info.prop('name').toProps() } id="companyName" placeholder="Company Name" />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow vPadding="12">
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor="companyDescription" label="Description" { ...info.prop('description').toProps() }>
                          <TextArea { ...info.prop('description').toProps() } id="companyDescription" placeholder="Company Description" />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow>
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor={ 'companyIndustry' } label="Industry" { ...info.prop('industry').toProps() }>
                          <PickerInput
                              { ...info.prop('industry').toProps() }
                              dataSource={ industryDataSource }
                              selectionMode="single"
                              getName={ (item) => item!.industry }
                              valueType="id"
                              id={ 'companyIndustry' }
                              placeholder="Please select"
                          />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow>
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor={ 'companySize' } label="Size" { ...info.prop('size').toProps() }>
                          <RadioGroup
                              name="companySize"
                              items={ [
                                  { id: 'small', name: 'Small' }, { id: 'medium', name: 'Medium' }, { id: 'large', name: 'Large' },
                              ] }
                              value={ color }
                              onValueChange={ setColor }
                              direction="horizontal"
                          />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                <FlexRow vPadding="12">
                  <FlexCell minWidth={ 324 } width="100%">
                      <LabeledInput htmlFor="coreProducts" label="Core products / Business lines" info="Core products / Business lines" { ...info.prop('coreProducts').toProps() }>
                          <TextArea { ...info.prop('coreProducts').toProps() } id="coreProducts" placeholder="Enter a text" />
                      </LabeledInput>
                  </FlexCell>
                </FlexRow>
                {/* <hr className={ css.divider } /> */}
                <FlexRow columnGap="12">
                    <FlexSpacer />
                    <Button caption="Save" color="primary" onClick={ save } />
                </FlexRow>
            </FlexCell>
        </Panel>
      </div>
  );
}
