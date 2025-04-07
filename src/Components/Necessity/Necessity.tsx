import { useFormik } from "formik";
import * as Yup from "yup";
import "./Necessity.css";
import { CreateGoalProps } from "../Steps.types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  heartfeltReason: string;
  idealOutcome: string;
}

const Necessity: React.FC<CreateGoalProps<FormValues>> = ({
  formValues,
  setFormValues,
  onNext,
  onBack,
}) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      heartfeltReason: "",
      idealOutcome: "",
    },
    validationSchema: Yup.object({
      heartfeltReason: Yup.string().required("heartfeltReason field is required."),
      idealOutcome: Yup.string().required("idealOutcome field is required."),
    }),
    onSubmit: (values) => {
      console.log("Form Data:", values);
      setFormValues((prev: FormValues) => {
        return { ...prev, Necessity: values };
      });
      onNext();
    },
  });

  useEffect(() => {
    if (formValues) {
      console.log(formValues);
      formik.setValues({
        heartfeltReason: formValues.heartfeltReason,
        idealOutcome: formValues.idealOutcome,
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
            <h2 className="form-heading">Why is this needed? (Heartfelt):</h2>
            <textarea
              name="heartfeltReason"
              placeholder="This is necessary because..."
              className={`form-textarea2`}
              value={formik.values.heartfeltReason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.heartfeltReason &&
              formik.errors.heartfeltReason && (
                <p className="error-message">{formik.errors.heartfeltReason}</p>
              )}
          </div>

          <div style={{ flex: 1 }}>
            <h2 className="form-heading">Desired Outcome (Animated):</h2>
            <textarea
              name="idealOutcome"
              placeholder="Visualize the Ideal Result"
              className={`form-textarea2`}
              value={formik.values.idealOutcome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.idealOutcome && formik.errors.idealOutcome && (
              <p className="error-message">{formik.errors.idealOutcome}</p>
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

export default Necessity;
