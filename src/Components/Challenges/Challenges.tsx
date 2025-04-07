import { useFormik } from "formik";
import * as Yup from "yup";
import "./Challenges.css";
import { FC, useEffect } from "react";
import { CreateGoalProps } from "../Steps.types";
import { useNavigate } from "react-router-dom";

interface FormValues {
  PossibleChallenges: string;
  PossibleSolutions: string;
}

const Challenges: FC<CreateGoalProps<FormValues>> = ({
  formValues,
  setFormValues,
  onNext,
  onBack,
}) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      PossibleChallenges: "",
      PossibleSolutions: "",
    },
    validationSchema: Yup.object({
      PossibleChallenges: Yup.string().required("PossibleChallenges required."),
      PossibleSolutions: Yup.string().required("PossibleSolutions required."),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      setFormValues((prev: FormValues) => {
        return { ...prev, Challenges: values };
      });

      onNext();
    },
  });

  useEffect(() => {
    if (formValues) {
      console.log(formValues);
      formik.setValues({
        PossibleChallenges: formValues.PossibleChallenges,
        PossibleSolutions: formValues.PossibleSolutions,
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
    <div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1 }}>
            <h2 className="form-heading">Possible Challenges</h2>
            <textarea
              name="PossibleChallenges"
              placeholder="Identifying Hurderls and Obstacles"
              className={`form-textarea2 ${
                formik.touched.PossibleChallenges &&
                formik.errors.PossibleChallenges
                  ? "form-error"
                  : ""
              }`}
              value={formik.values.PossibleChallenges}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.PossibleChallenges &&
              formik.errors.PossibleChallenges && (
                <p className="error-message">
                  {formik.errors.PossibleChallenges}
                </p>
              )}
          </div>

          <div style={{ flex: 1 }}>
            <h2 className="form-heading">PossibleSolutions</h2>
            <textarea
              name="PossibleSolutions"
              placeholder="Exploring Resolution and Responses..."
              className={`form-textarea2 ${
                formik.touched.PossibleSolutions &&
                formik.errors.PossibleSolutions
                  ? "form-error"
                  : ""
              }`}
              value={formik.values.PossibleSolutions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.PossibleSolutions &&
              formik.errors.PossibleSolutions && (
                <p className="error-message">
                  {formik.errors.PossibleSolutions}
                </p>
              )}
          </div>
        </div>

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
    </div>
  );
};

export default Challenges;
