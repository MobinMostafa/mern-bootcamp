
const Form = ({
    className,
    type,
    placeholder,
    label,
    ...others
}) => {
  return (
   <>
    <div className={className}>
      <label className="form-label">{label}</label>
      <input type={type} className="form-control"  placeholder={placeholder} {...others} />
    </div>

   </>
  )
}

export default Form