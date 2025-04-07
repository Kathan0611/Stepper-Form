import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stepper from "../Components/Stepper/Stepper";
import CreateGoal from "../Components/CreateGoal/CreateGoal";
import GoalPage from "../Components/GoalDetails/GoalDetails";
import Necessity from "../Components/Necessity/Necessity";
import Steps from "../Components/Steps/Steps";
import Challenges from "../Components/Challenges/Challenges";
import Additional from "../Components/Additional/Additional";
import axiosInstance from "../axios"; // Your axios instance
import { FormValues } from "../Pages/types/AddGobal.type";

const AddOrEditGoal: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [activeStep, setActiveStep] = useState(1);
  const [filledSteps, setFilledSteps] = useState(0);
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  // Determine if the user is in Edit Mode
  const isEditMode = state?.goal || id; // If goal exists in state or id is available, it's edit mode

  useEffect(() => {
    if (isEditMode) {
      if (state?.goal) {
        // If the goal is passed via state, set form values directly
        setFormValues(state.goal);
      } else if (id) {
        // If id is available in URL, fetch goal data from the server
        axiosInstance
          .get(`/goals/${id}`)
          .then((response) => {
            setFormValues(response.data);
          })
          .catch((error) => {
            console.error("Error fetching goal:", error);
            navigate("/goals");
          });
      }
    } else {
      // If in "Create" mode, initialize empty form values
      setFormValues({
        Assignment: {
          goalOwner: "",
          performanceGoal: "",
          selectedQuarter: "",
          dueDate: "",
          isCollaborative: false,
          collaborators: ["employee"],
          title: "",
          description: "",
        },
        GoalDetails: {
          title: "",
          description: "",
        },
        Necessity: {
          heartfeltReason: "",
          idealOutcome: "",
        },
        steps: [],
        Challenges: {
          PossibleChallenges: "",
          PossibleSolutions: "",
        },
        Additional: {
          SupportAndResourece: "",
          AdditionalComment: "",
        },
      });
    }
  }, [state, id, isEditMode, navigate]);

  const handleNext = () => {
    if (activeStep < 6) setActiveStep((prev) => prev + 1);
    setFilledSteps((prev) => Math.max(prev, activeStep));
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep((prev) => prev - 1);
  };

  const handleStepClick = (step: number) => {
    if (isEditMode || step <= filledSteps + 1 || step <= activeStep) {
      setActiveStep(step);
    }
  };

  if (!formValues) return <div>Loading...</div>; // Handle loading state if data is still fetching

  return (
    <div className="gap">
      <div>
        <div className="header">
          <h1>{isEditMode ? "Edit Goal" : "Create Goal"}</h1>
        </div>
        <Stepper
          activeStep={activeStep}
          onStepClick={handleStepClick}
          isEditMode={true}
          formData={formValues}
          filledSteps={filledSteps}
        />
        <div>
          {/* Render each step of the form */}
          {activeStep === 1 && formValues && (
            <CreateGoal
              formValues={formValues.Assignment}
              setFormValues={setFormValues}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 2 && formValues && (
            <GoalPage
              formValues={formValues.GoalDetails}
              setFormValues={setFormValues}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 3 && formValues && (
            <Necessity
              formValues={formValues.Necessity}
              setFormValues={setFormValues}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 4 && formValues && (
            <Steps
              formValues={formValues.steps}
              setFormValues={setFormValues}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 5 && formValues && (
            <Challenges
              formValues={formValues.Challenges}
              setFormValues={setFormValues}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {activeStep === 6 && formValues && (
            <Additional
              formValues={formValues}
              setFormValues={setFormValues}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOrEditGoal;
