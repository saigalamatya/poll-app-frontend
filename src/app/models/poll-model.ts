export class PollModel {

    constructor(private poll: String, private options: String[],
        private isAnonymous: Boolean, private startDate: Date,
        private endDate: Date, private pollId?: any) {
            this.poll = poll;
            this.options = options;
            this.isAnonymous = isAnonymous;
            this.startDate = startDate;
            this.endDate = endDate;
            this.pollId = this.pollId;
    }
}
