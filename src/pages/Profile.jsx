import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import {
  getUserProfile,
  saveUserProfile,
  getUserQuestionnaire,
} from "../utils/supabase";

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
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, questionnaireData] = await Promise.all([
          getUserProfile(user.id),
          getUserQuestionnaire(user.id),
        ]);

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

        setQuestionnaire(questionnaireData);
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

      <div className="card">
        <Typography variant="h5" component="h2" className="font-semibold mb-6">
          Skin Assessment Summary
        </Typography>

        {questionnaire ? (
          <div className="space-y-6">
            <div>
              <Typography variant="subtitle1" className="font-medium mb-2">
                Skin Type:
              </Typography>
              <Typography variant="body1" className="text-neutral-600">
                {questionnaire.skin_type
                  ? questionnaire.skin_type.charAt(0).toUpperCase() +
                    questionnaire.skin_type.slice(1)
                  : "Not specified"}
              </Typography>
            </div>

            <Divider />

            <div>
              <Typography variant="subtitle1" className="font-medium mb-2">
                Primary Concerns:
              </Typography>
              {questionnaire.primary_concerns &&
              questionnaire.primary_concerns.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1">
                  {questionnaire.primary_concerns.map((concern, index) => (
                    <li key={index} className="text-neutral-600">
                      {concern.charAt(0).toUpperCase() + concern.slice(1)}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body1" className="text-neutral-600">
                  No concerns specified
                </Typography>
              )}
            </div>

            <Divider />

            <div>
              <Typography variant="subtitle1" className="font-medium mb-2">
                Current Products:
              </Typography>
              <Typography variant="body1" className="text-neutral-600">
                {questionnaire.current_products || "No products specified"}
              </Typography>
            </div>

            <Button
              variant="outlined"
              href="/ai-recommendations"
              sx={{
                borderColor: "#FB6F92",
                color: "#FB6F92",
                "&:hover": {
                  borderColor: "#FF8FAB",
                  bgcolor: "rgba(251, 111, 146, 0.05)",
                },
              }}
            >
              Update Skin Assessment
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Typography variant="body1" color="textSecondary" gutterBottom>
              You haven&apos;t completed your skin assessment yet.
            </Typography>
            <Button
              variant="contained"
              href="/ai-recommendations"
              sx={{
                mt: 2,
                bgcolor: "#FB6F92",
                "&:hover": { bgcolor: "#FF8FAB" },
              }}
            >
              Take Skin Assessment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
