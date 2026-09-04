'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      type="button"
      className="btn-print-page"
      onClick={() => window.print()}
      title="Imprimir ou Salvar em PDF"
      aria-label="Imprimir ou Salvar em PDF este documento"
    >
      <Printer size={15} aria-hidden="true" />
      <span>Imprimir Documento</span>
    </button>
  );
}
