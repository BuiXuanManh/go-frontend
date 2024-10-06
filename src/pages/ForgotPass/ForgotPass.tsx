import { useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import '../Login/Login.css';
import { Link } from 'react-router-dom';
// import logo from '../../assets/images/Logo.png';
export default function ForgotPass() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (selected: boolean) => {
    setIsChecked(selected);
  };

  return (
    <div id='container'>
      <form id='forgot-password' className='form-container'>
        <img src={'../../assets/images/Logo.png'} alt='Logo'></img>
        <input type='text' placeholder='Email'></input>
        <div className='checkbox-container mt-2'>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
            <span className='sign__text'>
              I agree to the <Link to='/privacy'>Privacy Policy</Link>
            </span>{' '}
          </Checkbox>
        </div>
        <button className='primary-btn h-11 mb-4 mt-9'>Send</button>
        <span className='sign__text'>We will send a password to your Email</span>
      </form>
    </div>
  );
}
