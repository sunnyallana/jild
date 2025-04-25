import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { supabase } from '../utils/supabase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (error) {
      setError(error.message || 'Failed to send reset password email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-bg">
      <div className="bg-white p-8 rounded-xl shadow-medium max-w-md w-full">
        <div className="text-center mb-8">
          <Typography variant="h4" component="h1" className="font-bold text-neutral-800">
            Reset Password
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Enter your email to receive password reset instructions
          </Typography>
        </div>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        {success ? (
          <div className="text-center">
            <Alert severity="success" className="mb-4">
              Password reset instructions have been sent to your email
            </Alert>
            <Link
              to="/sign-in"
              className="text-primary hover:text-primary-light transition-colors duration-300"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ 
                bgcolor: '#FB6F92', 
                '&:hover': { bgcolor: '#FF8FAB' },
                py: 1.5
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Instructions'}
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/sign-in"
                className="text-primary hover:text-primary-light transition-colors duration-300"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;