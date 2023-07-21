import React from 'react';
import './FormInput.scss';

const FormInput = ({ label, ...otherprops }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherprops} />
      {
        label &&
        <label className={`form-input-label ${otherprops.value.length ? 'shrink' : ''}`}>{label}</label>
      }
    </div>
  )
}

export default FormInput