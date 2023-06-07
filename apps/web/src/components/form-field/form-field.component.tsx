/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, HTMLInputTypeAttribute, useState, useMemo } from 'react';
import styles from './form-field.module.scss';
import PasswordIcon from '../../assets/password-icon.png';

interface Props {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormInput: FC<Props> = ({ type = 'text', name, label, inputAttributes = {}, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e);
  };

  const inputType = useMemo(() => {
    if (type === 'password') {
      if (showPassword) {
        return 'text';
      }
      return 'password';
    }
    return type;
  }, [showPassword, type]);

  return (
    <div className={styles.formField}>
      <label htmlFor={name}>{label}</label>
      <input type={inputType} name={name} id={name} onChange={handleChange} {...inputAttributes} />
      {type === 'password' && <img onClick={() => setShowPassword(!showPassword)} src={PasswordIcon} alt="password" />}
    </div>
  );
};

export default FormInput;
