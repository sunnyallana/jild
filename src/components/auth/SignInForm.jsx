import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const { error } = await signIn(email, password);

      if (error) throw error;

      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <Typography
          variant="h4"
          component="h1"
          className="font-bold text-neutral-800"
        >
          Welcome Back
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Sign in to continue to your account
        </Typography>
      </div>

      {message && (
        <Alert severity="success" className="mb-4">
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
        </div>

        <div>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
        </div>

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-primary hover:text-primary-light transition-colors duration-300"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            bgcolor: "#FB6F92",
            "&:hover": { bgcolor: "#FF8FAB" },
            py: 1.5,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Typography variant="body2">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-primary hover:text-primary-light transition-colors duration-300"
          >
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignInForm;
