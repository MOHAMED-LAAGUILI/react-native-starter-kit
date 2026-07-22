import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { OnboardingControls } from './onboarding-controls';
import { OnboardingLottie } from './onboarding-lottie';

type Step = {
  image: any;
  title: string;
  description: string;
};

type OnboardingScreenProps = {
  steps: Step[];
  onComplete?: () => void;
};

export function OnboardingScreen({ steps, onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const progressPosition = useSharedValue(0);

  useEffect(() => {
    progressPosition.set(currentStep / (steps.length - 1));
  }, [currentStep, progressPosition, steps.length]);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection('forward');
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipToLastStep = () => {
    setDirection('forward');
    setCurrentStep(steps.length - 1);
  };

  return (
    <View className="flex-1">
      <OnboardingLottie currentStep={currentStep} direction={direction} steps={steps} />
      <OnboardingControls
        currentStep={currentStep}
        direction={direction}
        progressPosition={progressPosition}
        steps={steps}
        onBack={goToPreviousStep}
        onNext={goToNextStep}
        onSkip={skipToLastStep}
        onComplete={onComplete}
      />
    </View>
  );
}
