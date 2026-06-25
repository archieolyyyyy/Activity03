import { CASE_FILE_PDF_NAME, CASE_FILE_PDF_ASSET } from '../data/caseData';

function getAssetUrl() {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${encodeURI(CASE_FILE_PDF_ASSET)}`;
}

export async function downloadCaseFile() {
  const response = await fetch(getAssetUrl(), { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(
      `Case file not found. Place "${CASE_FILE_PDF_NAME}" in the usiu-dossier/public/ folder.`,
    );
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = CASE_FILE_PDF_NAME;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
