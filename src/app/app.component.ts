 
import { Component, Input, Output, EventEmitter,ElementRef, ViewChild } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pdfmake';
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  src = '';
  isPdfLoaded = false;
  private pdf: PDFDocumentProxy | any;


  @ViewChild('pdfContent', { static: false }) pdfContent: any;
  displayAlert: boolean = false;
  
    openAlert(): void {
        this.displayAlert = true;
    }

    closeAlert(): void {
        this.displayAlert = false;
    }
    
    onLoaded(pdf: PDFDocumentProxy) {
      this.pdf = pdf;
      this.isPdfLoaded = true;
    }
    ngOnInit() {
      this.src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    }

    print() {
      this.pdf.getData().then((u8) => {
        let blob = new Blob([u8.buffer], {
            type: 'application/pdf'
        });

        const blobUrl = window.URL.createObjectURL((blob));
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow?.print();
    });
    }
}
