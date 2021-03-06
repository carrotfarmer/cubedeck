import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { db } from "./firebase.config";
import { Member, Solve } from "./types";

export const prettify = (val: number): string => {
  if (val < 10) {
    return `0${val}`;
  }
  return val.toString();
};

export const sessionTagColor = (sessionType: string): string => {
  switch (sessionType) {
    case "2x2":
      return "orange";
    case "3x3":
      return "blue";
    case "4x4":
      return "green";
    case "5x5":
      return "teal";
    case "6x6":
      return "yellow";
    case "7x7":
      return "red";
    case "Pyramix":
      return "pink";
  }
};

export const convertToMinutesAndSeconds = (
  seconds: number
): {
  minutes: number;
  seconds: number;
} => {
  return {
    minutes: Math.floor(seconds / 60),
    seconds: seconds % 60,
  };
};

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export const generateInviteCode = (length: number): string => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const getGroupByInviteCode = (
  inviteCode: string,
  groups: DocumentData[]
) => {
  return groups.find((group) => group.inviteCode === inviteCode);
};

export const getGroupById = (id: string | string[], groups: DocumentData[]) => {
  return groups.find((group) => group.grpId === id);
};

export const isUserInGroup = (userId: string, group: DocumentData): boolean => {
  group.grpMembers.map((member: Member) => {
    if (member.uuid === userId) {
      return false;
    }
  });

  return true;
};

export const removeFromGroup = (group, userId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _group = updateDoc(doc(db, `groups/${group.grpId}`), {
    grpMembers: group.grpMembers.filter((member) => member.uuid !== userId),
  });

  if (group.solves.length > 0) {
    const _solves = group.solves.filter(
      (solve) => solve.member.uuid !== userId
    );
    updateDoc(doc(db, `groups/${group.grpId}`), {
      solves: _solves,
    });
  }
};

export const truncate = (str: string, chars: number): string => {
  if (str.length > chars) {
    return str.substring(0, chars) + "...";
  }
  return str;
};

export const getAllSolves = <Session>(sessions: Array<Session>): number[] => {
  // get all solves from all sessions
  const allSolves: number[] = [];
  sessions.forEach((session: Session) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    session.solves.forEach((solve: Solve) => {
      allSolves.push(solve.totalInSeconds);
    });
  });
  return allSolves;
};
