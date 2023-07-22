import React from 'react';
import { FormInputLabel, FormInputLabelShrink, FormInputStyle, Group } from './FormInput.Style';

const FormInput = ({ label, ...otherprops }) => {
  return (
    <Group>
      <FormInputStyle {...otherprops} />
      {
        label &&
        otherprops.value.length ?
        <FormInputLabelShrink>{label}</FormInputLabelShrink> :
        <FormInputLabel>{label}</FormInputLabel>
      }
    </Group>
  )
}

export default FormInput