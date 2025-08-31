import React from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";
import type { FormikProps, FormikValues } from "formik";
import { getIn } from "formik";

type BaseInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "type"
>;

type InputFieldProps<T extends FormikValues = FormikValues> = BaseInputProps & {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  hint?: string;

  getFieldProps: FormikProps<T>["getFieldProps"];
  touched: FormikProps<T>["touched"];
  errors: FormikProps<T>["errors"];

  wrapperStyle?: CSSProperties;
  inputStyle?: CSSProperties;
};

export default function InputField<T extends FormikValues = FormikValues>({
  name,
  label,
  hint,
  type = "text",
  getFieldProps,
  touched,
  errors,
  wrapperStyle,
  inputStyle,
  ...rest
}: InputFieldProps<T>) {
  const field = getFieldProps(name);
  const isTouched = Boolean(getIn(touched, name));
  const errorText = (getIn(errors, name) as string | undefined) || "";

  const hasError = isTouched && Boolean(errorText);

  return (
    <label style={{ display: "grid", gap: 6, ...(wrapperStyle || {}) }}>
      {label && <span style={{ fontWeight: 600 }}>{label}</span>}

      <input
        {...field}
        {...rest}
        name={name}
        type={type}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        style={{
          width: "100%",
          padding: 8,
          borderRadius: 6,
          border: `1px solid ${hasError ? "crimson" : "#ccc"}`,
          outline: "none",
          ...(inputStyle || {}),
        }}
      />

      {!hasError && hint && (
        <span style={{ color: "#666", fontSize: 12 }}>{hint}</span>
      )}

      {hasError && (
        <div id={`${name}-error`} style={{ color: "crimson", fontSize: 12 }}>
          {errorText}
        </div>
      )}
    </label>
  );
}
