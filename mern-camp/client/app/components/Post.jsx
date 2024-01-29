

const Post = ({
    rows,
    className,
    ...others
}) => {
  return (
    <div class="mb-3">
    <textarea className={`form-control ${className}`} rows={rows} {...others}></textarea>
    </div>
  )
}

export default Post