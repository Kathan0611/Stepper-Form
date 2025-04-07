import React from "react";
import "./Stepper.css";
import { FormValues } from "../../Pages/types/AddGobal.type";

interface StepperProps {
  activeStep: number;
  onStepClick: (step: number) => void;
  isEditMode: boolean;
  formData: FormValues;
  filledSteps: number;
}

const Stepper: React.FC<StepperProps> = ({
  activeStep,
  onStepClick,
  isEditMode = false,
  formData,
  filledSteps,
}) => {
  const steps = [
    "Assignment",
    "Goal details",
    "Necessity",
    "Steps",
    "Challenges",
    "Additionals",
  ];
  console.log(formData, "formdata");

  const isStepClickable = (stepNumber: number): boolean => {
    return isEditMode || stepNumber <= activeStep || stepNumber <= filledSteps;
  };
  console.log(isStepClickable, "flag");

  return (
    <div className="stepper">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isClickable = isStepClickable(stepNumber);
        console.log(isClickable);
        const isFilled = stepNumber <= filledSteps;
        return (
          <div
            key={index}
            className={`step ${stepNumber <= activeStep ? "active" : ""} ${
              isClickable ? "clickable" : ""
            } 
              ${isFilled ? "filled" : ""}}`}
            onClick={() => isClickable && onStepClick(stepNumber)}
          >
            <span>{stepNumber}</span>
            <p>{step}</p>
            {index < steps.length - 1 && (
              <div className="step-connector">
                <div className="connector-line"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
