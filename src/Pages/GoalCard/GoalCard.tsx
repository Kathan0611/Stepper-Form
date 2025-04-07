import { useNavigate } from "react-router-dom";
import "./GoalCard.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios";

const randomImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
];

interface Goal {
  id: string;
  Assignment: {
    goalOwner: string;
    performanceGoal: string;
    selectedQuarter: string;
    dueDate: string;
    isCollaborative: boolean;
    collaborators: string[];
  };
  GoalDetails: {
    title: string;
    description: string;
  };
  Necessity: {
    heartfeltReason: string;
    idealOutcome: string;
  };
  steps: {
    stepTitle: string;
    dueDate: string;
  }[];
  Challenges: {
    PossibleChallenges: string;
    PossibleSolutions: string;
  };
  Additional: {
    SupportAndResourece: string;
    AdditionalComment: string;
  };
  SupportAndResourece: string;
  AdditionalComment: string;
}

export default function GoalsList() {
  const [goals, setgoals] = useState<Goal[]>([]);

  const navigate = useNavigate();

  async function fetchList() {
    const repsonse = await axiosInstance.get("/goals");
    if (repsonse.data) {
      setgoals(repsonse.data);
      console.log(goals);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const handleClick = async () => {
    navigate("/goals/add");
  };

  const handleEditClick = (goal: Goal) => {
    navigate(`/goals/edit/${goal.id}`, { state: { goal } });
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h1>My Goals</h1>
        <button className="add-goal-btn" onClick={handleClick}>
          Add Goal
        </button>
      </div>

      <div className="goals-subheader">
        <div className="column-header">
          Details <span className="arrow-down">▼</span>
        </div>
        <div className="column-header progress">
          Progress Satisfaction <span className="arrow-down">▼</span>
        </div>
        <div className="column-header forecast">
          Success Forecast <span className="arrow-down">▼</span>
        </div>
        <div className="column-header">Collaborators</div>
        <div className="column-header">Actions</div>
      </div>

      <div className="goals-list">
        {goals.map((goal) => (
          <div key={goal.id} className="goal-row">
            <div className="goal-details">
              <div className="goal-title">
                <span>{goal.GoalDetails.title}</span>
                <span className="quarter">
                  {goal.Assignment.selectedQuarter}
                </span>
                <span className={`status-badge ${goal}`}>InProgress</span>
              </div>
              <p className="goal-description">{goal.GoalDetails.description}</p>
            </div>

            <div className="goal-progress">
              <span className="tag priority">
                {goal.Necessity.heartfeltReason}
              </span>
            </div>

            <div className="goal-forecast">
              <span className="tag impact">
                {goal.Challenges.PossibleChallenges}
              </span>
            </div>

            <div className="goal-collaborators">
              <div className="avatar-group">
              <div className="avatar">
                {goal.Assignment.collaborators.slice(0, 3).map((_, index) => (
                  <div key={index} >
                    {goal.Assignment.collaborators.map((_, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={
                          randomImages[
                            Math.floor(Math.random() * randomImages.length)
                          ]
                        }
                        alt={`Collaborator ${index + 1} - ${imageIndex + 1}`}
                        className={`avatar-image ${
                          imageIndex === 0 ? "first" : ""
                        }`}
                      />
                    ))}
                  </div>
                ))}
                {goal.Assignment.collaborators.length > 3 && (
                  <span className="extra-collaborators">
                    +{goal.Assignment.collaborators.length - 3}
                  </span>
                )}
              </div>
              <div className="avatar">
                {goal.Assignment.collaborators.slice(0, 3).map((_, index) => (
                  <div key={index} className="avatar">
                    {goal.Assignment.collaborators.map((_, imageIndex) => (
                      <img
                        key={imageIndex}
                        src={
                          randomImages[
                            Math.floor(Math.random() * randomImages.length)
                          ]
                        }
                        alt={`Collaborator ${index + 1} - ${imageIndex + 1}`}
                        className={`avatar-image ${
                          imageIndex === 0 ? "first" : ""
                        }`}
                      />
                    ))}
                  </div>
                ))}
                {goal.Assignment.collaborators.length > 3 && (
                  <span className="extra-collaborators">
                    +{goal.Assignment.collaborators.length - 3}
                  </span>
                )}
              </div>
              </div>      
            </div>

            <div className="goal-actions">
              <button
                className="edit-btn"
                onClick={() => handleEditClick(goal)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
