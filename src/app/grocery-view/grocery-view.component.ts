import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { rgb } from 'pdf-lib';
@Component({
  selector: 'app-grocery-view',
  templateUrl: './grocery-view.component.html',
  styleUrls: ['./grocery-view.component.scss']
})
export class GroceryViewComponent {
  displayedColumns: string[] = ['item', 'quantity', 'unit'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);

  }

  async createKannadaPDF() {

    const fontBytes = await fetch('assets/NotoSansKannada-Regular.ttf')
      .then(res => res.arrayBuffer());

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    pdfDoc.registerFontkit(fontkit)
    // Embed the font into the document
    const font = await pdfDoc.embedFont(fontBytes);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Define table content: headers
    const table = [
      ['Item', 'Quantity', 'Amount'],
      ...this.data.selectedItems.map((item: any) => [item.item, `${item.quantity} ${item.unit}`, ''])
    ];

    // Table positioning
    const tableStartX = 50;
    let tableStartY = height - 100; // Start a little lower from the top
    const rowHeight = 20;
    const columnWidths = [300, 100, 100];  // Adjust column widths
    const padding = 5;
    // Draw table headers
    table[0].forEach((header: any, index: any) => {
      page.drawText(header, {
        x: tableStartX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + padding, // X position for each column
        y: tableStartY,
        font: font,
        size: 12,
        color: rgb(0, 0, 0)
      });
    });

    // Draw the rows
    for (let i = 1; i < table.length; i++) {
      tableStartY -= rowHeight;  // Move to the next row
      const row = table[i];

      // Draw each cell in the row
      row.forEach((cell: any, index: any) => {
        const xPos = tableStartX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + padding;  // X position for each column
        const yPos = tableStartY;

        // Draw the text in each cell
        page.drawText(cell, {
          x: xPos,
          y: yPos,
          font: font,
          size: 10,
          color: rgb(0, 0, 0)
        });

        // Draw the borders for the cells (optional)
        page.drawRectangle({
          x: xPos - padding,
          y: yPos - 5, // Adjust vertical alignment of borders
          width: columnWidths[index],
          height: rowHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1
        });
      });
    }

    // Save the PDF document
    const pdfBytes = await pdfDoc.save();

    // Create a download link for the PDF
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    const date = Date.now()
    link.download = `Grocery-${date}`;
    link.click();
  }
}
