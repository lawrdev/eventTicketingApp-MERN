import PropTypes from "prop-types";
import "../AppButton.css";

export default function AppButton({
  text,
  onClick,
  fill,
  type,
  disabled,
  className,
}) {
  return (
    <>
      {fill ? (
        <button
          className={`AppButton1 active:scale-95 ${className} ${
            disabled ? "opacity-50" : ""
          }`}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {text}
        </button>
      ) : (
        <button
          className={`AppButton2 active:scale-95 ${className} ${
            disabled ? "opacity-50" : ""
          }`}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </>
  );
}

AppButton.defaultProps = {
  text: "Keys up!",
  fill: true,
  type: "button", // reset & submit,
  disabled: false,
};
AppButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  fill: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
