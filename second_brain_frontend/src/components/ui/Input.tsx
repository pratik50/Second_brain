interface InputProps {
  placeholder: string,
  refrence?: any
}

export function Input(props: InputProps) {
  return (
    <div>
      <input
        ref={props.refrence}
        placeholder={props.placeholder}
        type={"text"}
        className="px-4 py-2 border rounded-md m-2"
      ></input>
    </div>
  );
}
