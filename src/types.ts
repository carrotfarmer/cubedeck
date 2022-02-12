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
  groupName: string;
  groupColor: GroupColor;
  groupBio: string;
  groupImage: string;
  groupMembers: Member[];
  groupOwner: Member;
  groupId: string;
  // groupSessions: Session[];
}
