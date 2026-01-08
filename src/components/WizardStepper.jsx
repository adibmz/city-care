/**
 * @param {{ steps: string[], currentStep: number }} props
 */
export default function WizardStepper(props) {
  const { steps, currentStep } = props;

  return (
    <ol className="flex flex-wrap items-center gap-3">
      {steps.map((step, index) => {
        const state = index < currentStep ? 'done' : index === currentStep ? 'current' : 'upcoming';
        return (
          <li
            key={step}
            className="flex items-center gap-2"
            aria-current={state === 'current' ? 'step' : undefined}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                state === 'done'
                  ? 'bg-emerald-100 text-emerald-700'
                  : state === 'current'
                  ? 'bg-civic-700 text-white'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {index + 1}
            </span>
            <span className="text-sm font-medium text-slate-700">{step}</span>
            {index < steps.length - 1 && (
              <span className="hidden h-px w-6 bg-slate-200 sm:inline-block" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
