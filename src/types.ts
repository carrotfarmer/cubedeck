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
