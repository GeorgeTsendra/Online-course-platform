import { useFormik } from "formik";
import { LoginSchema } from "../../schemas/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { register } from "../../redux/actions/authActions";
import { RootState } from "../../redux/store";
import { LoadingStatusEnum } from "../../types/CommonTypes";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../components/form/InputField/InputField";
import styles from "./Register.module.scss";
import Button from "../../components/buttons/Button/Button";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, status } = useAppSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        dispatch(register(values));
      } catch (err: unknown) {
        console.error("Sign up err", err);
      }
    },
  });

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isSubmitting,
    isValid,
  } = formik;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              getFieldProps={getFieldProps}
              touched={touched}
              errors={errors}
            />
          </div>

          <div className={styles.field}>
            <InputField
              name="name"
              label="Name"
              type="text"
              placeholder="John Smith"
              getFieldProps={getFieldProps}
              touched={touched}
              errors={errors}
            />
          </div>

          <div className={styles.field}>
            <InputField
              name="password"
              label="Password"
              type="password"
              placeholder="Your password"
              getFieldProps={getFieldProps}
              touched={touched}
              errors={errors}
            />
          </div>

          <Button
            type="submit"
            isLoading={status === LoadingStatusEnum.loading}
            disabled={isSubmitting || !isValid}
            variant="primary"
            fullWidth
          >
            {status === LoadingStatusEnum.loading ? "Signing up…" : "Sign up"}
          </Button>
          <div className={styles.authHint}>
            <span>Have an account?</span>
            <Link className={styles.authLink} to="/login">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
