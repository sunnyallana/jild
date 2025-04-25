import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { getUserProfile, saveUserProfile } from "../utils/supabase";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await Promise.all([getUserProfile(user.id)]);

        if (profileData.profile) {
          setProfile({
            firstName: profileData.profile.first_name || "",
            lastName: profileData.profile.last_name || "",
            email: profileData.profile.email || user.email,
          });
        } else {
          setProfile({
            firstName: "",
            lastName: "",
            email: user.email,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      await saveUserProfile(user.id, {
        first_name: profile.firstName,
        last_name: profile.lastName,
        email: profile.email,
      });

      setSuccess(true);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to save profile changes");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[70vh]">
        <CircularProgress sx={{ color: "#FB6F92" }} />
      </Box>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="card mb-8">
        <Typography
          variant="h4"
          component="h1"
          className="font-bold text-neutral-800 mb-6"
        >
          Profile Settings
        </Typography>

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" className="mb-6">
            Profile updated successfully
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="First Name"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </div>

          <TextField
            label="Email Address"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            required
            type="email"
          />

          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{
              bgcolor: "#FB6F92",
              "&:hover": { bgcolor: "#FF8FAB" },
              py: 1.5,
            }}
          >
            {saving ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
