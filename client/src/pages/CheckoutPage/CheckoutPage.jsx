import React, { useEffect, useState } from 'react'
import { Button, FormInput } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../Store/CartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [contactPerson, setContactPerson] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if(shippingInfo){
      setContactPerson(shippingInfo.contactPerson);
      setStreet(shippingInfo.street);
      setCity(shippingInfo.city);
      setPostalCode(shippingInfo.postalCode);
      setState(shippingInfo.state);
      setCountry(shippingInfo.country);
      setPhoneNumber(shippingInfo.phoneNumber);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = {
      contactPerson: contactPerson,
      street: street,
      city: city,
      postalCode: postalCode,
      state: state,
      country: country,
      phoneNumber: phoneNumber
    }
    dispatch(saveShippingInfo(person));
    return navigate('/payment');
  }

  return (
    <div className="auth-container">
      <h3>Shipping Info</h3>
      <form method='post'>
        <FormInput
          label='Contact Person'
          type="text"
          required
          onChange={(e) => setContactPerson(e.target.value)}
          name='contactPerson'
          value={contactPerson}
        />

        <FormInput
          label='Street'
          type="text"
          required
          onChange={(e) => setStreet(e.target.value)}
          name='street'
          value={street}
        />

        <FormInput
          label='City'
          type="text"
          required
          onChange={(e) => setCity(e.target.value)}
          name='city'
          value={city}
        />

        <FormInput
          label='Postal Code'
          type="text"
          required
          onChange={(e) => setPostalCode(e.target.value)}
          name='postalCode'
          value={postalCode}
        />

        <FormInput
          label='State'
          type="text"
          required
          onChange={(e) => setState(e.target.value)}
          name='state'
          value={state}
        />

        <FormInput
          label='Country'
          type="text"
          required
          onChange={(e) => setCountry(e.target.value)}
          name='country'
          value={country}
        />

        <FormInput
          label='Phone Number'
          type="text"
          required
          onChange={(e) => setPhoneNumber(e.target.value)}
          name='phoneNumber'
          value={phoneNumber}
        />

        <Button onClick={handleSubmit}>Proceed to Payment</Button>
      </form>
    </div>
  )
}

export default Checkout;