

const SignHeader = ({headerText,className}) => {
  return (
    <div className={`py-5 px-0 text-light ${className}`} style={{backgroundColor: "#424769"}}>
        <div className="col text-center">
            <h1>{headerText}</h1>
        </div>
    </div>
  )
}

export default SignHeader