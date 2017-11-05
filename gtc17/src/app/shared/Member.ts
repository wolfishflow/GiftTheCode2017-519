
export class Member {
  constructor(
  public memberId: number,
  public firstName: string,
  public lastName: string,
  public birthdate: string,
  public programs: Array<any>,
  public streetAddress: string,
  public aptNumber: string,
  public streetNumber: string,
  public city: string,
  public province: string,
  public country: string,
  public postalcode: string,
  public withinCatchmentArea: boolean,
  public email: string,
  public permissionForSoliciting: boolean,
  public permissionForNewsletter: boolean,
  public status: string,
  public preferredPhone: string,
  public testimony: string,
  public password: string,
  ) {}
}
