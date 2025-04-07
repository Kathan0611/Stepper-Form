import { useFormik } from "formik";
import * as Yup from "yup";
import "./Additional.css"; // Import custom CSS file
import { FC, useEffect } from "react";
import { CreateGoalProps } from "../Steps.types";
import axiosInstance from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

interface FormValues {
  SupportAndResourece: string;
  AdditionalComment: string;
}

const Additional: FC<CreateGoalProps<FormValues>> = ({
  formValues,
  setFormValues,
  onBack,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const formik = useFormik<FormValues>({
    initialValues: {
      SupportAndResourece: "",
      AdditionalComment: "",
    },
    validationSchema: Yup.object({
      SupportAndResourece: Yup.string().required("SupportAndResourece is required."),
      AdditionalComment: Yup.string().required("AdditionalComment field is required."),
    }),
    onSubmit: (values) => {
      const updatedFormValues = {
        ...formValues,
        SupportAndResourece: values.SupportAndResourece,
        AdditionalComment: values.AdditionalComment,
      };

      setFormValues(updatedFormValues);

      handleSubmit(updatedFormValues);
    },
  });

  // form submit on
  async function handleSubmit(updatedFormValues: FormValues) {
    try {
      if (id) {
        await axiosInstance.put(`/goals/${id}`, updatedFormValues);
      } else {
        await axiosInstance.post("/goals", updatedFormValues);
      }
      navigate("/goalcard");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (formValues) {
      console.log(formValues);
      formik.setValues({
        SupportAndResourece: formValues.SupportAndResourece || "",
        AdditionalComment: formValues.AdditionalComment || "",
      });
    }
  }, [formValues]);

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
            <h2 className="form-heading">Support and Resource Needed:</h2>
            <textarea
              name="SupportAndResourece"
              placeholder="Requirements for Assistance  and Tools"
              className={`form-textarea2 ${
                formik.touched.AdditionalComment &&
                formik.errors.SupportAndResourece
                  ? "form-error"
                  : ""
              }`}
              value={formik.values.SupportAndResourece}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.SupportAndResourece &&
              formik.errors.SupportAndResourece && (
                <p className="error-message">
                  {formik.errors.SupportAndResourece}
                </p>
              )}
          </div>

          <div style={{ flex: 1 }}>
            <h2 className="form-heading">Additional Comment:</h2>
            <textarea
              name="AdditionalComment"
              placeholder="Any Extra Thoughts or Remarks"
              className={`form-textarea2 ${
                formik.touched.AdditionalComment &&
                formik.errors.AdditionalComment
                  ? "form-error"
                  : ""
              }`}
              value={formik.values.AdditionalComment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.AdditionalComment &&
              formik.errors.AdditionalComment && (
                <p className="error-message">
                  {formik.errors.AdditionalComment}
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Additional;
