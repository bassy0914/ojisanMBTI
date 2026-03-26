import { BASE_PROMPT, mbtiTypes } from '../data/mbtiTypes';

const IMAGEN_MODEL = 'imagen-3.0-generate-002';

export async function generateOjisanImage(mbtiType) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('NO_API_KEY');
  }

  const baseType = mbtiType.split('-')[0];
  const typeData = mbtiTypes[baseType];
  if (!typeData) throw new Error('UNKNOWN_TYPE');

  const fullPrompt = `${BASE_PROMPT} ${typeData.imagePrompt}`;

  // Try Imagen 3 predict endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      instances: [{ prompt: fullPrompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: '1:1',
        safetyFilterLevel: 'block_few',
        personGeneration: 'allow_adult',
      },
    }),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    const status = response.status;

    if (status === 400) throw new Error('API_BAD_REQUEST');
    if (status === 401 || status === 403) throw new Error('API_UNAUTHORIZED');
    if (status === 429) throw new Error('API_QUOTA');

    const msg = errBody?.error?.message || `HTTP ${status}`;
    throw new Error(`API_ERROR: ${msg}`);
  }

  const data = await response.json();

  const prediction = data?.predictions?.[0];
  if (!prediction) throw new Error('NO_PREDICTION');

  const b64 = prediction.bytesBase64Encoded;
  const mime = prediction.mimeType || 'image/png';

  if (!b64) throw new Error('NO_IMAGE_DATA');

  return `data:${mime};base64,${b64}`;
}
