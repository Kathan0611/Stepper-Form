import React from "react";

interface Step {
  stepTitle: string;
  dueDate: string;
}

interface StepItemProps {
  step: Step;
  onEdit: () => void;
  onDelete: () => void;
}

const StepItem: React.FC<StepItemProps> = ({ step, onEdit, onDelete }) => {
  console.log(step);
  return (
    <div className="step-item">
      <div className="step-title">{step.stepTitle}</div>
      <div className="step-due-date">{step.dueDate}</div>
      <div className="updated-button">
      <button className="edit-button" onClick={onEdit}>
        Edit
      </button>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
      </div>
    </div>
  );
};

export default StepItem;
