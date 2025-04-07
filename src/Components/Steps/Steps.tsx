import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import StepItem from "./StepItem";
import "./Steps.css";
import { useNavigate } from "react-router-dom";

interface Step {
  stepTitle: string;
  dueDate: string;
}

const Steps: React.FC<{
  formValues: Step[];
  setFormValues: React.Dispatch<React.SetStateAction<Step[]>>;
  onNext: () => void;
  onBack: () => void;
}> = ({ formValues, setFormValues, onNext, onBack }) => {
  const [steps, setSteps] = useState<Step[]>([ { stepTitle: "Step 1", dueDate: "2025-02-10" }]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      stepTitle: "",
      dueDate: "",
    },
    validationSchema: Yup.object().shape({
      stepTitle: Yup.string()
      .required("Step title is required")
      .test("unique", "Step title must be unique", (value) => {
        if (!value) return true; // Skip validation if empty (handled by required)
        return !steps.some((step, index) =>
          index !== editingIndex && step.stepTitle.toLowerCase() === value.toLowerCase()
        );
      }),
      dueDate: Yup.string().required("Due date is required"),
    }),
    onSubmit: (values, { resetForm }) => {

      let updatedSteps;
    
      if (editingIndex !== null) {
        // Update existing step
         updatedSteps = steps.map((step, index) =>
          index === editingIndex
            ? { stepTitle: values.stepTitle, dueDate: values.dueDate }
            : step
        );

        setEditingIndex(null);
      } else {
        // Add a new step
        updatedSteps = [...steps, { stepTitle: values.stepTitle, dueDate: values.dueDate }];


      }
      setSteps(updatedSteps);
     console.log(updatedSteps,"kl")
      setFormValues((prev: Step[]) => {
        
        return { ...prev, steps: updatedSteps };
      });
      resetForm();
    },
  });

  const handleEdit = (index: number) => {

    setEditingIndex(index);
    const selectedStep = steps[index];
    console.log(selectedStep,"ll")
   
    formik.setValues({
      stepTitle: selectedStep.stepTitle,
      dueDate: selectedStep.dueDate,
    });
  };

  const handleDelete = (index: number) => {
    const filteredSteps = steps.filter((_, i) => i !== index);
    setSteps(filteredSteps);
  };

  const handleNext = () => {
    if (steps.length === 0) {
      alert("Please add at least one step before proceeding.");
    } else {
      onNext();
    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    if (window.confirm("Do you really want to leave this page?")) {
      console.log("User confirmed cancellation.");
      navigate("/goalcard");
    }
  };

  useEffect(() => {
     console.log(formValues,"lllllll")
    if (formValues) {
      setSteps(formValues);
    }
  }, [formValues]);

  return (
    <div className="goal-creation-container">
      <div className="steps-container">
        {steps.length > 0 ? (
          steps.map((step, index) => (
            <StepItem
              key={index}
              step={step}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        ) : (
          <div className="error-message">
            <p>Please add at least one step to proceed.</p>
          </div>
        )}
      </div>

      <div className="add-another-title-wrapper">
        <div className="add-another-label">
          {editingIndex !== null ? "Edit Step" : "Add Another Step"}
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="add-step-form">
          <div className="form-group">
            <label htmlFor="step-title">Step Title</label>
            <input
              type="text"
              name="stepTitle"
              placeholder="Enter step title"
              value={formik.values.stepTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input2"
            />
            {formik.touched.stepTitle && formik.errors.stepTitle && (
              <span className="error-message">{formik.errors.stepTitle}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date & Time</label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input2"
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <span className="error-message">{formik.errors.dueDate}</span>
            )}
          </div>
          <div className="buttons">
            <button type="submit" className="btn btn-primary">
              {editingIndex !== null ? "Update Step" : "+ Add Step"}
            </button>
          </div>
          <div className="button-group2">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={onBack}>
              Back
            </button>
            <button type="submit" onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Steps;
