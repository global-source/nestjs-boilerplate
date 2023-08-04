export default interface UserInterface {
  /**
   *  Record ID
   */
  id: number;

  /**
   * FirstName of the User
   */
  first_name: string;

  /**
   * LastName of the User
   */
  last_name: string;

  /**
   * User's Email
   */
  email: string;

  /**
   * User's Phone
   */
  phone: string;

  /**
   * Account's Password
   */
  password: string;

  /**
   * Account Status
   */
  is_active: boolean;

  /**
   * Entry trace
   */
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
