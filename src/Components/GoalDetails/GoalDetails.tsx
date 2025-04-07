import { useFormik } from "formik";
import * as Yup from "yup";
import "./GoalDetails.css";
import { FC, useEffect } from "react";
import { CreateGoalProps } from "../Steps.types";
import { useNavigate } from "react-router-dom";

interface FormValues {
  title: string;
  description: string;
}

const GoalPage: FC<CreateGoalProps<FormValues>> = ({
  formValues,
  setFormValues,
  onNext,
  onBack,
}) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters long"),
    description: Yup.string()
      .required("Description is required")
      .min(20, "Description must be at least 20 characters long"),
  });

  // Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form Data", values);
      setFormValues((prev: FormValues) => {
        return { ...prev, GoalDetails: values };
      });
      onNext();
    },
  });

  useEffect(() => {
    if (formValues) {
      console.log(formValues);
      formik.setValues({
        title: formValues.title,
        description: formValues.description,
      });
    }
  }, [formValues]);

  const navigate = useNavigate();

  const handleCancel = () => {
    if (window.confirm("Do you really want to leave this page?")) {
      console.log("User confirmed cancellation.");
      navigate("/goalcard");
    }
  };

  return (
    <div className="goal-page-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          {/* Title of Goal */}
          <div className="form-column">
            <label htmlFor="title" className="form-label">
              Title of Goal
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter goal title"
              className="form-input"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="form-error">{formik.errors.title}</p>
            )}
          </div>

          {/* Goal Description */}
          <div className="form-column">
            <label htmlFor="description" className="form-label">
              Goal Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Type goal description"
              className="form-textarea"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="form-error">{formik.errors.description}</p>
            )}
            <p className="form-helper-text">
              Remember to include information that covers a SMART Goal:
              Specific, Measurable, Accountable, Realistic, Timely and a HARD
              Goal: Heartfelt, Animated, Required, Difficult
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="button-group">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="button back-button" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="button next-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalPage;
