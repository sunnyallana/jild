import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import PropTypes from "prop-types";

const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="card animate-fadeIn">
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6">
        Personal Information
      </h2>
      <p className="text-neutral-600 mb-6">
        Let&apos;s get to know you better so we can provide personalized
        skincare recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <TextField
            label="Full Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />
        </div>

        <div>
          <TextField
            label="Age"
            name="age"
            type="number"
            value={data.age}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            inputProps={{ min: 16, max: 100 }}
          />
        </div>

        <div>
          <TextField
            label="Location"
            name="location"
            value={data.location}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            placeholder="City, Country"
            helperText="This helps us factor in climate considerations"
          />
        </div>

        <div>
          <FormControl fullWidth>
            <InputLabel id="marital-status-label">Marital Status</InputLabel>
            <Select
              labelId="marital-status-label"
              name="maritalStatus"
              value={data.maritalStatus}
              onChange={handleChange}
              label="Marital Status"
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="divorced">Divorced</MenuItem>
              <MenuItem value="widowed">Widowed</MenuItem>
              <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;

PersonalInfoForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    location: PropTypes.string,
    maritalStatus: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
