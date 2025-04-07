import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation schema
import "./CreateGoal.css";
import { CreateGoalProps } from "./../Steps.types";
import { useNavigate } from "react-router-dom";

// Validation schema using Yup
const validationSchema = Yup.object({
  goalOwner: Yup.string().trim().required("atleast one required"),
  performanceGoal: Yup.string()
    .min(10, "Performance goal must be at least 10 characters")
    .trim()
    .required("Performance goal is required"),
  selectedQuarter: Yup.string()
    .trim()
    .required("Quarter selection is required"),
  dueDate: Yup.date()
    .min(new Date(), "Due date must be in the future")
    .required("Due date is required"),
  isCollaborative: Yup.boolean(),
  collaborators: Yup.array().
  nullable().
  when("isCollaborative", {
    is: true,
    then: (schema) => schema.min(1, "Please select at least one collaborator"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

interface FormValues {
  goalOwner: string;
  performanceGoal: string;
  selectedQuarter: string;
  dueDate: string;
  isCollaborative: boolean;
  collaborators: string[];
}
const CreateGoal: React.FC<CreateGoalProps<FormValues>> = ({
  formValues,
  setFormValues,
  onNext,
  onBack,
}) => {
  const formik = useFormik({
    initialValues: {
      goalOwner: "",
      performanceGoal: "",
      selectedQuarter: "",
      dueDate: "",
      isCollaborative: false,
      collaborators: ["employee"],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted!", values);
      console.log("Collaborators:", values.collaborators);
      setFormValues((prev: FormValues) => {
        return { ...prev, Assignment: values };
      });

      onNext();
    },
  });

  useEffect(() => {
    if (formValues) {
      console.log(formValues);
      formik.setValues({
        goalOwner: formValues.goalOwner || "",
        performanceGoal: formValues.performanceGoal || "",
        selectedQuarter: formValues.selectedQuarter || "",
        dueDate: formValues.dueDate || "",
        isCollaborative: formValues.isCollaborative || false,
        collaborators: formValues.collaborators || ["employee"],
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
    <form className="create-goal-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="goalOwner" className="goalOwner">
          Goal Owner:
        </label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="goalOwner"
              value="Myself"
              checked={formik.values.goalOwner === "Myself"}
              onChange={formik.handleChange}
            />
            Myself
          </label>
          <label>
            <input
              type="radio"
              name="goalOwner"
              value="Direct Report"
              checked={formik.values.goalOwner === "Direct Report"}
              onChange={formik.handleChange}
            />
            Direct Report
          </label>
        </div>
        {formik.touched.goalOwner && formik.errors.goalOwner && (
          <div className="error">{formik.errors.goalOwner}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="performanceGoal">Describe Performance Goal:</label>
        <textarea
          id="performanceGoal"
          name="performanceGoal"
          value={formik.values.performanceGoal}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.performanceGoal && formik.errors.performanceGoal && (
          <div className="error">{formik.errors.performanceGoal}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="selectedQuarter">Quarter Selection:</label>
        <div className="quarter-selection">
          {["Q1", "Q2", "Q3", "Q4", "Annual"].map((quarter) => (
            <label key={quarter}>
              <input
                type="radio"
                name="selectedQuarter"
                value={quarter}
                checked={formik.values.selectedQuarter === quarter}
                onChange={formik.handleChange}
              />
              {quarter}
            </label>
          ))}
        </div>
        {formik.touched.selectedQuarter && formik.errors.selectedQuarter && (
          <div className="error">{formik.errors.selectedQuarter}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date & Time:</label>
        <input
          type="datetime-local"
          id="dueDate"
          name="dueDate"
          value={formik.values.dueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.dueDate && formik.errors.dueDate && (
          <div className="error">{formik.errors.dueDate}</div>
        )}
      </div>

      <div className="form-group">
        <label>Collaborative Goal?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="isCollaborative"
              value="true"
              checked={formik.values.isCollaborative === true}
              onChange={() => formik.setFieldValue("isCollaborative", true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="isCollaborative"
              value="false"
              checked={formik.values.isCollaborative === false}
              onChange={() => formik.setFieldValue("isCollaborative", false)}
            />
            No
          </label>
        </div>
      </div>

      {formik.values.isCollaborative && (
        <div className="form-group">
          <label htmlFor="collaborators">Collaborators:</label>
          <select
            id="collaborators"
            name="collaborators"
            value={formik.values.collaborators}
            onChange={(e) =>
              formik.setFieldValue(
                "collaborators",
                Array.from(e.target.selectedOptions).map(
                  (option) => option.value
                )
              )
            }
          >
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Charlie">Charlie</option>
          </select>
          {formik.touched.collaborators && formik.errors.collaborators && (
            <div className="error">{formik.errors.collaborators}</div>
          )}
        </div>
      )}

      <div className="button-group">
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" onClick={onBack}>
          Back
        </button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default CreateGoal;
