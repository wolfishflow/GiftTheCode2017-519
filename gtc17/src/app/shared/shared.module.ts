import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
  ],
  declarations: [],
  exports: [
    ReactiveFormsModule
  ]
})
export class SharedModule { }
