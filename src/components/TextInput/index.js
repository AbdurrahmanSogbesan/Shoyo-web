import { Hidden } from "@material-ui/core";
import "./TextInput.css";

function TextInput({
  label,
  htmlFor,
  type = "text",
  id,
  name,
  placeholder,
  error,
  touched,
  value,
  onChange,
  onBlur,
}) {
  // console.log("touched", touched);

  return (
    <div className={`text-container`}>
      <label htmlFor={htmlFor} className="title">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        error={error}
        touched={touched}
        className="text-input"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched ? (
        <span className={`error-text ${error ? "show" : "hide"}`}>{error}</span>
      ) : null}
    </div>
  );
}

export default TextInput;
