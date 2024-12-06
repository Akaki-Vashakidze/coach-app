import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule,MatTabsModule,TranslateModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Input() chosenIndex !:number;
  @Output() onChange = new EventEmitter();
  @Input() tabs!:{
    title:string;
    action:string
  }[]

  onTabChange(action:any){
    this.onChange.emit(this.tabs[action.index].action);
  }
}
