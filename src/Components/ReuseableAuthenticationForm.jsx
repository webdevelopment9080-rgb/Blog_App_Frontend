import ReactDatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { userLogin, userRegister } from "../features/authenticationSlice/authenticationSlice";

function ReuseableAuthenticationForm({
  fields = [{ name: "abc", type: "text", placeholder: "Backup Field" }],
  handler,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serverError, setServerError] = useState("");

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setServerError("");
    try {
      
      if (handler === "register") {

        await dispatch(userRegister({name:data.name, email: data.email, password: data.password, role:"user" })).unwrap();
        await dispatch(userLogin({ email: data.email, password: data.password })).unwrap();
        navigate("/");

      } else if (handler === "login") {
        await dispatch(userLogin({ email: data.email, password: data.password })).unwrap();
        navigate("/");
      }
    } catch (error) {
      if (handler === "login") {
        setError("email", {
          type: "manual",
          message: "User not registered or incorrect credentials",
        });
      }
      setServerError(error?.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      px: 2,
      bgcolor: "#f5f5f5",
    }}>

      <Box sx={{
        width: "100%",
        maxWidth: 420,
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 3,
        p: 4,
      }}>

        {/* Title */}
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 700, mb: 0.5 }}>
          {handler === "register" ? "Create Account" : "Welcome Back"}
        </Typography>

        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}>
          {handler === "register"
            ? "Sign up to read interesting topics"
            : "Log in to continue your journey"}
        </Typography>

        {/* Server error */}
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {fields.map((eachField) => (
            <Controller
              key={eachField.name}
              control={control}
              name={eachField.name}
              rules={{
                required: `${eachField.placeholder} is required`,
                ...(eachField.name === "password" && {
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Min 8 chars with uppercase, lowercase, number & special character",
                  },
                }),
                ...(eachField.name === "confirmPassword" && {
                  validate: (value) => value === password || "Passwords do not match",
                }),
              }}
              render={({ field: { onChange, onBlur, value } }) =>
                eachField.type === "date" ? (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                      {eachField.placeholder}
                    </Typography>
                    <ReactDatePicker
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                    />
                    {errors[eachField.name] && (
                      <Typography sx={{ color: "error.main", fontSize: 12 }}>
                        {errors[eachField.name].message}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    label={eachField.placeholder}
                    type={eachField.type}
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={!!errors[eachField.name]}
                    helperText={errors[eachField.name]?.message}
                    size="small"
                  />
                )
              }
            />
          ))}

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 1, py: 1.5, fontWeight: 700 }}
          >
            {isSubmitting ? "Please wait..." : handler === "register" ? "Create Account" : "Log In"}
          </Button>

        </Box>

        {/* Footer link */}
        <Typography variant="body2" sx={{ textAlign: "center", mt: 3, color: "text.secondary" }}>
          {handler === "register" ? "Already have an account? " : "Don't have an account? "}
          <Box
            component="span"
            onClick={() => navigate(handler === "register" ? "/login" : "/register")}
            sx={{ color: "primary.main", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          >
            {handler === "register" ? "Log In" : "Sign Up"}
          </Box>
        </Typography>

      </Box>
    </Box>
  );
}

export default ReuseableAuthenticationForm;