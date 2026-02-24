import { useEffect } from 'react';

const BASE_TITLE = 'hexwave';

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — Music Curation Platform`;
  }, [title]);
}
