import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .matches(/[A-Z]/, "One uppercase letter required")
    .matches(/[a-z]/, "One lowercase letter required")
    .matches(/[^A-Za-z0-9]/, "One special character required")
    .required("Password is required"),
});
