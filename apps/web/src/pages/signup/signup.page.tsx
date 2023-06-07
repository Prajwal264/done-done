import { NavLink, useNavigate } from 'react-router-dom';
import styles from './signup.module.scss';
import logo from '../../assets/logo/logo.png';
import PrimaryButton from '../../components/primary-button/primary-button.component';
import FormInput from '../../components/form-field/form-field.component';
import React, { useCallback, useState } from 'react';
import User, { RegisterPayload } from '../../services/api/user.api.service';
import { validateEmail } from '../../helpers/validation.helpers';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setAccessToken, setRefreshToken } from '../../helpers/token.helper';
import { toast } from 'react-hot-toast';

interface ISignupPageProps { }

const SignupPage: React.FC<ISignupPageProps> = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    dob: new Date(),
  });
  const [errorMap, setErrorMap] = useState({
    email: '',
    password: '',
    dob: ''
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;
      validateErrors(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData],
  );

  const validateErrors = (field: string, value: string) => {
    if (field === 'email') {
      if (!validateEmail(value)) {
        setErrorMap({
          ...errorMap,
          email: 'Please Enter a Valid Email',
        })
      } else {
        setErrorMap({
          ...errorMap,
          email: '',
        })
      }
    } else if (field === 'password') {
      const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!re.test(value)) {
        setErrorMap({
          ...errorMap,
          password: 'Please enter an 8 letter password, with at least a symbol, upper and lower case letters and a number',
        })
      } else {
        setErrorMap({
          ...errorMap,
          password: '',
        })
      }
    }
  }
  const signup: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      setLoading(true);
      const { email, password } = formData;
      const payload: RegisterPayload = {
        email,
        password,
      };
      const registerPromise = new User().register(payload)?.catch(() => setLoading(false));
      toast.promise(registerPromise, {
        loading: 'Registering User',
        error: (e) => {
          debugger;
          return e;
        },
        success: 'User Registered Successfully',
      });
      const registerResponse = await registerPromise;
      if (registerResponse) {
        setLoading(false);
        setAccessToken(registerResponse.acesssToken);
        setRefreshToken(registerResponse.refreshToken);
        navigate('/app/');
      }
    },
    [formData],
  );

  const setDateOfBirth = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        dob: date,
      });
    }
  }

  return (
    <div className={styles.signupPage}>
      <form className={styles.signupForm}>
        <NavLink to="/" className={styles.signupFormLogo}>
          <img src={logo} alt="logo" width={170} />
        </NavLink>
        <h1 className={styles.signupFormHeader}>Sign up</h1>
        <FormInput type="email" name="email" label={'Email'} onChange={handleChange}
          inputAttributes={{
            className: errorMap.email ? 'error' : '',
          }}
          errorAttr={{
            errorValue: errorMap.email
          }} />
        <FormInput type="password" name="password" label={'Password'} onChange={handleChange}
          inputAttributes={{
            className: errorMap.password ? 'error' : '',
          }}
          errorAttr={{
            errorValue: errorMap.password
          }} />
        <label htmlFor={'dob'}>Date of Birth</label>
        <DatePicker className={styles.datePicker} selected={formData.dob} onChange={(date) => setDateOfBirth(date)} />
        <PrimaryButton disabled={!!(errorMap.email || errorMap.password || !formData.email || !formData.password || !formData.dob)} content="Create Account" type="button" onClick={signup} loading={loading} />
        <div className={styles.note}>
          By continuing with Google, Apple, or Email, you agree to DoneDone Terms of Service and Privacy Policy .
        </div>
        <div className={styles.seperator}></div>
        <div className={styles.moveToLoginCta}>
          Already signed up? <NavLink to="/login">Go to login</NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
