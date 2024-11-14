export interface ProfileModel {
    // bio: string;
    // email: string;
    // familyName: string;
    // following: any[];
    // givenName: string;
    // interests?: any[];
    // name: string;
    // photoUrl: string;
    // uid: string;
    // type?: 'Organizer' | 'Personal' | undefined;

    bio: string;
  createdAt: string;
  email: string;
  familyName: string;
  givenName: string;
  name: string;
  photoUrl: string;
  updatedAt: string;
  following: string[];
  uid: string;
  interests?: string[];
  type?: 'Organizer' | 'Personal' | undefined;
  }