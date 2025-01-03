interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors = [],
  name,
}: FormInputProps) {
  return (
    <div>
      <input
        className="p-1 text-black rounded-sm"
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
      />
      {errors?.map((error, index) => (
        <span key={index}>{error}</span>
      ))}
    </div>
  );
}
