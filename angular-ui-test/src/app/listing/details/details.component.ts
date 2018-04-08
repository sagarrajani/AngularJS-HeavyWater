import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'list-item-details,date-pipe',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() private data: any = {};
  private report_s3path;
  private statement_s3path;
  constructor(private sanitizer: DomSanitizer) {
  console.log(this.data)
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
