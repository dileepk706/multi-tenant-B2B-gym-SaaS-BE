import OnboardingFcade from '@/module/onboarding/application/fcades/onboarding.fcade.js';
import IOnboardingController from '@/module/onboarding/domain/onboarding.controller.interface.js';
import IOnboardingFcade from '@/module/onboarding/domain/onboarding.fcade.interface.js';
import OnboardingController from '@/module/onboarding/interfaces/onboarding.controller.js';
import { DependencyContainer } from 'tsyringe';

const registerOnboardingModule = (container: DependencyContainer) => {
  container.register<IOnboardingController>('IOnboardingController', OnboardingController);
  container.register<IOnboardingFcade>('IOnboardingFcade', OnboardingFcade);
};

export default registerOnboardingModule;
