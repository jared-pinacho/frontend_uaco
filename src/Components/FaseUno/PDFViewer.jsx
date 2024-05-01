import React, { useState } from 'react';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';

// Establecer la ruta del worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfUrl, isOpen, onClose }) => {
  const [numPages, setNumPages] = useState(null);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Visor de PDF Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '800px',
        },
      }}
    >
      <div>
        <Document file={pdfUrl} onLoadSuccess={handleDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} width={600} />
          ))}
        </Document>
      </div>
      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
};
export default PDFViewer; 