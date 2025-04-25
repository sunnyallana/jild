import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { saveUserQuestionnaire, getUserQuestionnaire } from "../utils/supabase";
import PersonalInfoForm from "../components/questionnaire/PersonalInfoForm";
import HealthInfoForm from "../components/questionnaire/HealthInfoForm";
import SkinConcernsForm from "../components/questionnaire/SkinConcernsForm";
import PhotoUpload from "../components/questionnaire/PhotoUpload";
import Results from "../components/questionnaire/Results";

const steps = [
  "Personal Information",
  "Health Information",
  "Skin Concerns",
  "Photo Upload",
  "Results",
];

const AiRecommendations = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      age: "",
      location: "",
      maritalStatus: "",
    },
    healthInfo: {
      existingConditions: [],
      allergies: [],
      medications: "",
      regularCycle: true,
      pregnant: false,
    },
    skinConcerns: {
      skinType: "",
      primaryConcerns: [],
      currentProducts: "",
    },
    photoUrl: null,
  });
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          // Check if user has existing questionnaire data
          const existingData = await getUserQuestionnaire(user.id);

          if (existingData) {
            setFormData({
              personalInfo: {
                name: existingData.name || "",
                age: existingData.age || "",
                location: existingData.location || "",
                maritalStatus: existingData.marital_status || "",
              },
              healthInfo: {
                existingConditions: existingData.existing_conditions || [],
                allergies: existingData.allergies || [],
                medications: existingData.medications || "",
                regularCycle: existingData.regular_cycle ?? true,
                pregnant: existingData.pregnant ?? false,
              },
              skinConcerns: {
                skinType: existingData.skin_type || "",
                primaryConcerns: existingData.primary_concerns || [],
                currentProducts: existingData.current_products || "",
              },
              photoUrl: existingData.photo_url || null,
            });

            // If user has completed the questionnaire, move to results
            if (existingData.completed && existingData.photo_url) {
              setResults(existingData.photo_url);
              setActiveStep(4);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user]);

  const handleNext = async () => {
    // Validate current step
    if (
      activeStep === 1 &&
      (formData.healthInfo.pregnant || !formData.healthInfo.regularCycle)
    ) {
      alert(
        "We're sorry, but this application is not designed for pregnant individuals or those with irregular cycles. Please consult a healthcare professional for personalized skincare advice.",
      );
      return;
    }

    // Save data at each step
    try {
      if (activeStep === 0) {
        await saveUserQuestionnaire(user.id, {
          name: formData.personalInfo.name,
          age: formData.personalInfo.age,
          location: formData.personalInfo.location,
          marital_status: formData.personalInfo.maritalStatus,
        });
      } else if (activeStep === 1) {
        await saveUserQuestionnaire(user.id, {
          existing_conditions: formData.healthInfo.existingConditions,
          allergies: formData.healthInfo.allergies,
          medications: formData.healthInfo.medications,
          regular_cycle: formData.healthInfo.regularCycle,
          pregnant: formData.healthInfo.pregnant,
        });
      } else if (activeStep === 2) {
        await saveUserQuestionnaire(user.id, {
          skin_type: formData.skinConcerns.skinType,
          primary_concerns: formData.skinConcerns.primaryConcerns,
          current_products: formData.skinConcerns.currentProducts,
        });
      } else if (activeStep === 3) {
        // Final step - mark as completed
        await saveUserQuestionnaire(user.id, {
          completed: true,
        });

        // Set the results with the photo analysis data
        setResults(formData.photoUrl);
        setActiveStep(4);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("There was an error saving your data. Please try again.");
      return;
    }

    if (activeStep < 3) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormChange = (step, data) => {
    setFormData((prev) => {
      if (step === "personalInfo") {
        return { ...prev, personalInfo: { ...prev.personalInfo, ...data } };
      } else if (step === "healthInfo") {
        return { ...prev, healthInfo: { ...prev.healthInfo, ...data } };
      } else if (step === "skinConcerns") {
        return { ...prev, skinConcerns: { ...prev.skinConcerns, ...data } };
      } else if (step === "photoUrl") {
        return { ...prev, photoUrl: data };
      }
      return prev;
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onChange={(data) => handleFormChange("personalInfo", data)}
          />
        );
      case 1:
        return (
          <HealthInfoForm
            data={formData.healthInfo}
            onChange={(data) => handleFormChange("healthInfo", data)}
          />
        );
      case 2:
        return (
          <SkinConcernsForm
            data={formData.skinConcerns}
            onChange={(data) => handleFormChange("skinConcerns", data)}
          />
        );
      case 3:
        return (
          <PhotoUpload
            photoUrl={formData.photoUrl}
            onChange={(url) => handleFormChange("photoUrl", url)}
          />
        );
      case 4:
        return <Results results={results} />;
      default:
        return "Unknown step";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <CircularProgress sx={{ color: "#FB6F92" }} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="card mb-8">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ color: "#FB6F92", fontWeight: 600 }}
        >
          AI Skincare Recommendations
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel className="mb-8 mt-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-8">{getStepContent(activeStep)}</div>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0 || activeStep === 4}
            onClick={handleBack}
            startIcon={<ArrowLeft size={16} />}
            sx={{
              color: "#FB6F92",
              "&.Mui-disabled": { color: "rgba(0, 0, 0, 0.26)" },
            }}
          >
            Back
          </Button>

          {activeStep < 4 && (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={
                activeStep === 3 ? (
                  <CheckCircle size={16} />
                ) : (
                  <ArrowRight size={16} />
                )
              }
              sx={{
                bgcolor: "#FB6F92",
                "&:hover": { bgcolor: "#FF8FAB" },
              }}
            >
              {activeStep === 3 ? "Finish" : "Next"}
            </Button>
          )}
        </Box>
      </div>
    </div>
  );
};

export default AiRecommendations;
