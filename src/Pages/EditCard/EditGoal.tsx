import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Stepper from '../../Components/Stepper/Stepper';
import CreateGoal from '../../Components/CreateGoal/CreateGoal';
import GoalPage from '../../Components/GoalDetails/GoalDetails';
import Necessity from '../../Components/Necessity/Necessity';
import Steps from '../../Components/Steps/Steps';
import Challenges from '../../Components/Challenges/Challenges';
import Additional from '../../Components/Additional/Additional';
import axiosInstance from '../../axios';  // Your axios instance
import { Goal } from '../types/AddGobal.type';

const EditGoal: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [activeStep, setActiveStep] = useState(1);
  const [formValues, setFormValues] = useState<Goal | null>(null);
 

  useEffect(() => {
    if (state?.goal) {
      // If goal is passed through state (e.g., from Goals List), use that data
      setFormValues(state.goal);
    } else if (id) {
      // If goal ID is present, fetch the goal data from the server
      axiosInstance.get(`/goals/${id}`)
        .then(response => {
          setFormValues(response.data);
        })
        .catch(error => {
          console.error("Error fetching goal:", error);
          navigate("/goals");
        });
    }
  }, [state, id, navigate]);

  const handleNext = () => {
    if (activeStep < 6) setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(prev => prev - 1);
  };

  const handleStepClick = (step: number) => {
    if (formValues) setActiveStep(step);
  };

  

  return (
    <div className="gap">
      <div>
        <div className="header">
          <h1>{state?.goal ? 'Edit Goal' : 'Create Goal'}</h1>
        </div>
        <Stepper activeStep={activeStep} onStepClick={handleStepClick} />
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

export default EditGoal;
