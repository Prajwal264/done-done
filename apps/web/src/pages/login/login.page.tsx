import { NavLink, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import logo from '../../assets/logo/logo.png';
import PrimaryButton from '../../components/primary-button/primary-button.component';
import FormInput from '../../components/form-field/form-field.component';
import { useCallback, useState } from 'react';
import User, { LoginPayload } from '../../services/api/user.api.service';
import { setAccessToken, setRefreshToken } from '../../helpers/token.helper';

interface ILoginPageProps { }

const LoginPage: React.FC<ILoginPageProps> = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData],
  );
  const login: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.stopPropagation();
      setLoading(true);
      const { email, password } = formData;
      const payload: LoginPayload = {
        email,
        password,
      };
      const loginResponse = await new User().login(payload)?.catch(() => setLoading(false));
      setLoading(false);
      if (loginResponse) {
        setAccessToken(loginResponse.acesssToken);
        setRefreshToken(loginResponse.refreshToken);
        navigate('/app/');
      }
    },
    [formData],
  );
  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm}>
        <NavLink to="/" className={styles.loginFormLogo}>
          <img src={logo} alt="logo" width={170} />
        </NavLink>
        <h1 className={styles.loginFormHeader}>Log in</h1>
        <FormInput type="email" name="email" label={'Email'} onChange={handleChange} />
        <FormInput type="password" name="password" label={'Password'} onChange={handleChange} />
        <PrimaryButton content="Log in" type="button" onClick={login} loading={loading} />
        <div className={styles.note}>
          By continuing with Google, Apple, or Email, you agree to DoneDone Terms of Service and Privacy Policy .
        </div>
        <div className={styles.seperator}></div>
        <div className={styles.moveToSignCta}>
          Dont have an account? <NavLink to="/signup">Sign up</NavLink>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
