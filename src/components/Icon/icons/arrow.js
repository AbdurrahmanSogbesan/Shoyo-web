function arrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="10"
      fill={props.fill}
      viewBox="0 0 8 14"
      {...props}
    >
      <path
        fill={props.fill}
        d="M7.713 7L1.702.99.288 2.404l4.6 4.6-4.6 4.593 1.414 1.414L7.713 7z"
      ></path>
    </svg>
  );
}

export default arrow;
