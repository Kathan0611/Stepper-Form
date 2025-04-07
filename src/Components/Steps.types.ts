export interface CreateGoalProps<T> {
  formValues: T;
  setFormValues: React.Dispatch<React.SetStateAction<T>>;
  onNext: () => void;
  onBack: () => void;
}

