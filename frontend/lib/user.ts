import { Session } from "next-auth";

export const getUserID = (session: Session): string => {
    return `${session.sub}`;
}