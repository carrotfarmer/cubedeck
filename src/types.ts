import { FieldValue } from "firebase/firestore";

export interface Solve {
  minutes: number;
  seconds: number;
  totalInSeconds: number;
  id: string;
}

export interface Session {
  sessionTitle: string;
  sessionNotes?: string;
  sessionType: string;
  uuid: string;
  solves: Solve[];
  createdAt: FieldValue;
}

// Group colors
export interface GroupColor {
  colorVal: string;
  colorName: string;
}

export interface Member {
  name: string;
  uuid: string;
  profileImage: string;
}
export interface Group {
  grpName: string;
  grpColor: GroupColor;
  grpBio: string;
  grpImg: string;
  grpMembers: Member[];
  grpOwner: Member;
  groupId: string;
  // groupSessions: Session[];
}
