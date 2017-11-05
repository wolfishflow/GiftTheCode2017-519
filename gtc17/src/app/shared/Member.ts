
export class Member {
  constructor(
  public memberId: number,
  public firstName: string,
  public lastName: string,
  public birthdate: string,
  public streetAddress: string,
  public aptNumber: string,
  public streetNumber: string,
  public city: string,
  public province: string,
  public country: string,
  public postalcode: string,
  public withinCatchmentArea: boolean,
  public email: string,
  public status: string,
  public preferredPhone: string,
  public membershipDetails: string
  ) {}
}
