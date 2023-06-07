/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { FC, HTMLInputTypeAttribute, useState, useMemo } from 'react';
import styles from './form-field.module.scss';
import PasswordIcon from '../../assets/password-icon.png';
import { Tooltip } from 'react-tooltip';

interface Props {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  inputAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  errorAttr?: {
    errorValue: string;
  }
}

const FormInput: FC<Props> = ({ type = 'text', name, label, inputAttributes = {}, onChange, errorAttr }) => {
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
      <input
        data-tooltip-id="error-tooltip"
        data-tooltip-content={errorAttr?.errorValue}
        data-tooltip-place="top"
        type={inputType} name={name} id={name} onChange={handleChange} {...inputAttributes} />
      {type === 'password' && <img onClick={() => setShowPassword(!showPassword)} src={PasswordIcon} alt="password" />}
      <Tooltip isOpen={!!errorAttr?.errorValue} id="error-tooltip" place='top'></Tooltip>
    </div>
  );
};

export default FormInput;
