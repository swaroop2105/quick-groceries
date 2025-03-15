import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { rgb } from 'pdf-lib';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-grocery-view',
  templateUrl: './grocery-view.component.html',
  styleUrls: ['./grocery-view.component.scss']
})
export class GroceryViewComponent {
  displayedColumns: string[] = ['slno', 'item', 'quantity'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private clipboard: Clipboard, private snackbar: MatSnackBar) {

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
      ['SL No', 'Item', 'Quantity'],
      ...this.data.selectedItems.map((item: any, i: any) => [`${i + 1}`, item.item, `${item.quantity} ${item.unit}`])
    ];

    // Table positioning
    const tableStartX = 50;
    let tableStartY = height - 100; // Start a little lower from the top, leaving space for the date
    const rowHeight = 20;
    const columnWidths = [50, 300, 150];  // Adjust column widths
    const padding = 5;

    // Draw date and time at the top
    page.drawText(`Date and Time: ${this.getFormattedDate()}`, {
      x: tableStartX,
      y: height - 40, // Position for the date and time text
      font: font,
      size: 12,
      color: rgb(0, 0, 0)
    });

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
    const date = Date.now();
    link.download = `Grocery-${this.getFormattedDate()}`;
    link.click();
  }


  copyTableData() {
    let copiedText = '';

    copiedText += this.getFormattedDate() + '\n'

    // Add table data
    this.data.selectedItems.forEach((item: any, i: any) => {
      this.displayedColumns.forEach(col => {
        if (col === 'slno') {

        }
        else if (col === 'quantity') {
          copiedText += item[col] + item['unit'];
        }
        else {
          copiedText += item[col] + ' - ';
        }
      });
      copiedText += '\n'; // new line
    });

    // Copy the formatted text to the clipboard
    this.clipboard.copy(copiedText);

    this.snackbar.open('Copied to clipboard!', 'Ok', {
      duration: 2000
    })
  }


  getFormattedDate() {
    // Get the current date and time
    const currentDate = new Date();

    // Format the date as dd/MM/yyyy
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pad day with leading zero if needed
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Pad month with leading zero, months are 0-indexed
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}-${currentDate.toLocaleTimeString()}`;
    return formattedDate
  }
}
