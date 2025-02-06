import jsPDF from 'jspdf';
import PptxGenJS from 'pptxgenjs';

export const downloadJSON = (obj: any) => {
  const jsonStr = JSON.stringify(obj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'summary.json';
  link.click();
};

export const exportToPDF = (jsonObject: any) => {
  const doc = new jsPDF();
  const pageWidth = 200; // Approximate width of a page in mm (A4 size)
  const marginLeft = 10; // Left margin
  const maxLineWidth = pageWidth - marginLeft * 2; // Usable width for text
  const lineHeight = 10; // Line height in mm
  const pageHeight = 290; // Approximate height of a page in mm (A4 size)
  let y = 20; // Starting Y-coordinate

  // Function to add wrapped text and handle page overflow
  const addWrappedText = (text, x, yStart, isBold = false) => {
    // Split text into lines that fit within the max width
    const lines = doc.splitTextToSize(text, maxLineWidth);

    // Set font based on whether the text is bold or not
    if (isBold) {
      doc.setFont('Helvetica', 'bold'); // Set bold font for keys
    } else {
      doc.setFont('Helvetica', 'normal'); // Set normal font for values
    }

    // Add each line
    lines.forEach((line) => {
      // Check if we need a new page
      if (y + lineHeight > pageHeight) {
        doc.addPage();
        y = 10; // Reset Y-coordinate for the new page
      }
      doc.text(line, x, y);
      y += lineHeight; // Increment Y-coordinate for the next line
    });
  };

  // Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Summary', marginLeft, 10);

  // Add each key-value pair
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);

  for (const key in jsonObject) {
    if (typeof jsonObject[key] === 'object' && !Array.isArray(jsonObject[key])) {
      // Handle nested objects
      addWrappedText(`${key}:`, marginLeft, y, true); // Make the key bold
      for (const subKey in jsonObject[key]) {
        addWrappedText(`  - ${subKey}: ${jsonObject[key][subKey]}`, marginLeft, y);
      }
    } else if (Array.isArray(jsonObject[key])) {
      // Handle arrays
      addWrappedText(`${key}:`, marginLeft, y, true); // Make the key bold
      const currentY = y
      jsonObject[key].forEach((item) => {
        addWrappedText(`  - ${item}`, marginLeft, currentY);
      });
    } else {
      // Handle simple key-value pairs
      addWrappedText(`${key}:`, marginLeft, y, true); // Make the key bold
      addWrappedText(`${jsonObject[key]}`, marginLeft, y); // Regular text for value
    }
  }

  // Save the PDF
  doc.save('summary.pdf');
};

export const exportToPPT = (jsonObject) => {
  const pptx = new PptxGenJS(); // Create a new PowerPoint presentation
  
  // Add a slide
  const slide = pptx.addSlide();
  
  // Add a title to the slide
  slide.addText('Summary', { x: 1, y: 0.5, fontSize: 24, bold: true });

  let yPosition = 1.5; // Start y position for the first text box

  // Iterate over the JSON object and add formatted text
  for (const key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
      const value = jsonObject[key];

      // Add the key (make it bold)
      slide.addText(key, {
        x: 1,
        y: yPosition,
        fontSize: 18,
        bold: true,
        fontFace: 'Arial',
      });

      yPosition += 0.5; // Adjust vertical position for the next line

      // Add the value (normal text)
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Handle nested objects
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            slide.addText(`${subKey}: ${value[subKey]}`, {
              x: 1.5,
              y: yPosition,
              fontSize: 18,
              fontFace: 'Arial',
            });
            yPosition += 0.5; // Adjust position after adding the nested value
          }
        }
      } else if (Array.isArray(value)) {
        // Handle arrays
        // eslint-disable-next-line no-loop-func
        value.forEach(item => {
          slide.addText(`  - ${item}`, {
            x: 1.5,
            y: yPosition,
            fontSize: 18,
            fontFace: 'Arial',
          });
          yPosition += 0.5; // Adjust position after adding the array item
        });
      } else {
        // Handle primitive values
        slide.addText(value, {
          x: 1.5,
          y: yPosition,
          fontSize: 18,
          fontFace: 'Arial',
        });
        yPosition += 0.5; // Adjust position after adding the value
      }

      // Add an empty line for readability
      yPosition += 0.5;
    }
  }

  // Save the PowerPoint presentation as a .pptx file
  pptx.writeFile({ fileName: 'summary.pptx' });
};