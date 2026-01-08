import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CityMap from '../components/CityMap';
import WizardStepper from '../components/WizardStepper';
import { useSEO } from '../hooks/useSEO';
import { useToast } from '../hooks/useToast';
import { addReport, createDraftReport } from '../store/reportStore';
import {
  CATEGORY_OPTIONS,
  determinePriority,
  generateAiSuggestion
} from '../utils/reportHelpers';

const steps = ['Catégorie', 'Photo & description', 'Localisation'];
const DEFAULT_LOCATION = { lat: 31.7917, lng: -7.0926 };

export default function CreateReportPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    category: '',
    title: '',
    description: '',
    photoUrl: '',
    locationAddress: '',
    locationLat: DEFAULT_LOCATION.lat,
    locationLng: DEFAULT_LOCATION.lng
  });

  useSEO({
    title: 'CityCare | Nouveau signalement',
    description:
      'Créez un signalement en trois étapes pour informer la municipalité.'
  });

  const stepMarkers = useMemo(
    () => [
      {
        id: 'draft',
        lat: form.locationLat,
        lng: form.locationLng,
        label: 'Position choisie'
      }
    ],
    [form.locationLat, form.locationLng]
  );

  const mapCenter = useMemo(
    () => [form.locationLat, form.locationLng],
    [form.locationLat, form.locationLng]
  );

  const updateField = useCallback((name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateLocation = useCallback((lat, lng) => {
    setForm((prev) => ({
      ...prev,
      locationLat: Number(lat),
      locationLng: Number(lng)
    }));
  }, []);

  const handleMapSelect = useCallback(
    (pos) => {
      const nextLat = Number(pos.lat.toFixed(6));
      const nextLng = Number(pos.lng.toFixed(6));
      updateLocation(nextLat, nextLng);
    },
    [updateLocation]
  );

  const handlePhotoChange = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photoUrl', reader.result || '');
      };
      reader.readAsDataURL(file);
    },
    [updateField]
  );

  const validateStep = useCallback(
    (stepIndex) => {
      const nextErrors = {};
      if (stepIndex === 0) {
        if (!form.category) nextErrors.category = 'Sélectionnez une catégorie.';
        if (!form.title.trim()) nextErrors.title = 'Le titre est obligatoire.';
      }
      if (stepIndex === 2) {
        if (!form.locationAddress.trim()) {
          nextErrors.locationAddress = 'L’adresse est obligatoire.';
        }
      }
      setErrors(nextErrors);
      return Object.keys(nextErrors).length === 0;
    },
    [form]
  );

  const validateAll = useCallback(() => {
    const nextErrors = {};
    if (!form.category) nextErrors.category = 'Sélectionnez une catégorie.';
    if (!form.title.trim()) nextErrors.title = 'Le titre est obligatoire.';
    if (!form.locationAddress.trim()) {
      nextErrors.locationAddress = 'L’adresse est obligatoire.';
    }
    setErrors(nextErrors);
    return nextErrors;
  }, [form]);

  const handleNext = useCallback(() => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [currentStep, validateStep]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const nextErrors = validateAll();
      if (Object.keys(nextErrors).length > 0) {
        setCurrentStep(nextErrors.category || nextErrors.title ? 0 : 2);
        return;
      }

      setIsSubmitting(true);
      const aiSuggestion = generateAiSuggestion({
        category: form.category,
        description: form.description
      });
      const priority = determinePriority({
        category: form.category,
        description: form.description
      });
      const timelineNote = 'Signalement créé par un citoyen.';
      const draft = createDraftReport({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        photoUrl:
          form.photoUrl || 'https://picsum.photos/seed/citycare-new/800/600',
        location: {
          lat: form.locationLat,
          lng: form.locationLng,
          address: form.locationAddress.trim()
        },
        aiSuggestion,
        priority,
        timeline: [
          {
            at: new Date().toISOString(),
            status: 'New',
            note: timelineNote
          }
        ]
      });

      addReport(draft);
      toast.push({
        type: 'success',
        message: 'Signalement créé avec succès.'
      });
      navigate(`/signalements/${draft.id}`);
    },
    [form, navigate, toast, validateAll]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">
          Créer un signalement
        </h1>
        <p className="text-slate-600">
          Trois étapes simples pour informer la ville et suivre l’avancement.
        </p>
      </section>

      <WizardStepper steps={steps} currentStep={currentStep} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        {currentStep === 0 && (
          <div className="grid gap-4">
            <label className="flex flex-col text-sm text-slate-600">
              Catégorie
              <select
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
                className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                required
              >
                <option value="">Choisir</option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="mt-1 text-xs text-rose-600">{errors.category}</span>
              )}
            </label>
            <label className="flex flex-col text-sm text-slate-600">
              Titre du signalement
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                placeholder="Ex: Déchets sur le trottoir"
                className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                required
              />
              {errors.title && (
                <span className="mt-1 text-xs text-rose-600">{errors.title}</span>
              )}
            </label>
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid gap-4">
            <label className="flex flex-col text-sm text-slate-600">
              Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-2 text-sm"
              />
            </label>
            {form.photoUrl && (
              <img
                src={form.photoUrl}
                alt="Prévisualisation de la photo"
                className="h-48 w-full rounded-2xl object-cover"
              />
            )}
            <button
              type="button"
              onClick={() =>
                updateField('photoUrl', 'https://picsum.photos/seed/citycare-demo/800/600')
              }
              className="w-fit rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-civic-400 hover:text-civic-700"
            >
              Utiliser une photo de démonstration
            </button>
            <label className="flex flex-col text-sm text-slate-600">
              Description
              <textarea
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
                rows={5}
                placeholder="Décrivez le problème, le contexte et l’urgence."
                className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
              />
            </label>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid gap-4">
            <label className="flex flex-col text-sm text-slate-600">
              Adresse
              <input
                type="text"
                value={form.locationAddress}
                onChange={(event) => updateField('locationAddress', event.target.value)}
                placeholder="Rue, quartier, repère"
                className="mt-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                required
              />
              {errors.locationAddress && (
                <span className="mt-1 text-xs text-rose-600">
                  {errors.locationAddress}
                </span>
              )}
            </label>
            <CityMap
              markers={stepMarkers}
              selectedId="draft"
              onSelect={handleMapSelect}
              center={mapCenter}
              zoom={13}
              ariaLabel="Sélection de la position"
              heightClass="h-72"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col text-sm text-slate-600">
                Latitude
                <input
                  type="number"
                  step="0.0001"
                  value={form.locationLat}
                  onChange={(event) => {
                    if (event.target.value === '') return;
                    const nextLat = Number(event.target.value);
                    if (!Number.isNaN(nextLat)) {
                      updateLocation(nextLat, form.locationLng);
                    }
                  }}
                  className="mt-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                />
              </label>
              <label className="flex flex-col text-sm text-slate-600">
                Longitude
                <input
                  type="number"
                  step="0.0001"
                  value={form.locationLng}
                  onChange={(event) => {
                    if (event.target.value === '') return;
                    const nextLng = Number(event.target.value);
                    if (!Number.isNaN(nextLng)) {
                      updateLocation(form.locationLat, nextLng);
                    }
                  }}
                  className="mt-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-civic-600"
                />
              </label>
            </div>
          </div>
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Retour
        </button>
        <div className="flex flex-wrap gap-2">
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-civic-700 px-4 py-2 text-sm font-semibold text-white"
            >
              Continuer
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-civic-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {isSubmitting ? 'Envoi...' : 'Publier le signalement'}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
