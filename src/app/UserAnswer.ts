import { IUserAnswer } from "./IUserAnswer";

export class UserAnswer implements IUserAnswer {
    constructor(public questionId : string, public answer: number){
    }
}