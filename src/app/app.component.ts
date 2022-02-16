import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
} from "@angular/forms";
import { promise } from "protractor";
import { Observable } from "rxjs";
import { Project } from "./formData";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  userData: FormGroup;
  statusOptions = ["stable", "critical", "finished"];
  formData: Project;
  submitted = false;
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        projectName: new FormControl("draft name", [Validators.required]),
        email: new FormControl("example@gmail.com", [
          Validators.required,
          Validators.email,
        ]),
        status: new FormControl("stable", [], this.validateStatusFromServer),
      }),
    });
  }

  onSubmit() {
    this.userData = <FormGroup>this.signupForm.get("userData");
    this.formData = new Project(
      this.userData.get("projectName").value,
      this.userData.get("email").value,
      this.userData.get("status").value
    );
    this.submitted = true;
    console.log(this.formData);
  }

  validateStatusFromServer(
    status: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (status.value === "critical") {
          resolve({ statusInvalid: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
