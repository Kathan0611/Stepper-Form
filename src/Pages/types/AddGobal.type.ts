//AddGobal Form Types
export interface FormValues {
    Assignment: {
      goalOwner: string;
      performanceGoal: string;
      selectedQuarter: string;
      dueDate: string;
      isCollaborative: boolean;
      collaborators: string[];
      title: string;
      description: string;
    };
    GoalDetails: {
      title: string;
      description: string;
    };
    Necessity: {
      heartfeltReason: string;
      idealOutcome: string;
    };
    steps:Step[];
    Challenges: {
      PossibleChallenges: string;
      PossibleSolutions: string;
    };
    Additional: {
      SupportAndResourece: string;
      AdditionalComment: string;
    };
  }

  export interface Step {
    stepTitle: string;
    dueDate: string;
  }