export class VoteModel {

    constructor(private pollId: String, private option: String) {
        this.pollId = pollId;
        this.option = option;
    }

}