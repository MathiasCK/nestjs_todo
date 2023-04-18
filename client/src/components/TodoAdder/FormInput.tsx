import './TodoAdder.styles.css';

// @ts-ignore
const FormInput = ({handleChange, label, ...otherProps}) => (
  <section className="group">
    <input className="input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? 'shrink' : ''
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </section>
);

export default FormInput;
