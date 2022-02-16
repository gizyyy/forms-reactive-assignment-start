export class Project {
  projectName: string;
  email: string;
  status: string;
  constructor(projectName: string, email: string, status: string) {
    this.projectName = projectName;
    this.email = email;
    this.status = status;
  }
}
