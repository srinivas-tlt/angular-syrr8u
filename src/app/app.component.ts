import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { jsPDF } from "jspdf";
// import * as htmlToImage from 'html-to-image';
@Component({
  selector: "nz-demo-form-normal-login",
  template: `
    <form id="formId"
      nz-form
      [formGroup]="validateForm"
      class="login-form"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your username!">
          <nz-input-group  >
            <input
              type="text"
              nz-input
              formControlName="userName"
              placeholder="Username"
            />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your Password!">
          <nz-input-group >
            <input
              type="password"
              nz-input
              formControlName="password"
              placeholder="Password"
            />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <div nz-row class="login-form-margin">
        <div nz-col [nzSpan]="12">
          <label nz-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
        </div>
        <div nz-col [nzSpan]="12">
          <a class="login-form-forgot">Forgot password</a>
        </div>
      </div>
      <button
        nz-button
        class="login-form-button login-form-margin"
        [nzType]="'primary'"
      >
        Log in
      </button>
      Or <a> register now! </a>
    </form>
    <div id="test">
      testing
    </div>

    <button (click)="download()">Download Form</button>
  `,
  styles: [
    `
      .login-form {
        max-width: 300px;
      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    `
  ]
})
export class NzDemoFormNormalLoginComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  download() {
    var doc = new jsPDF();
    // var elementHandler = {
    //   "#ignorePDF": function(element, renderer) {
    //     return true;
    //   }
    // };
    var source = window.document.getElementById("formId");
    source.style.width = "1080px"
    source.style.height = "1350px"
    console.log("source", source);
    // doc.html(source);

    this.usingHTMLToImage(source)


    
  }

  usingHTMLToImage=(source)=>{
    htmlToImage.toPng(source)
  .then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img);
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });

  }

  usingJsPDF =(doc,source)=>{
    doc.html(source, {
      callback: function(pdf) {
        // /*
        // var iframe = document.createElement('iframe');
        // iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:1080px;allow:fullscreen;');
        // document.body.appendChild(iframe);
        // iframe.src = pdf.output('datauristring');
        // */
        /*
        let dataUri = pdf.output("datauristring");
        var win = window.open();
        win.document.write(
          '<iframe src="' +
            dataUri +
            '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
        );
        */

        pdf.save('test',{

        })
      }
    });
  }
}
