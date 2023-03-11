import Moment from 'moment-timezone';

export class MomentService {

    protected timezone = process.env.TIME_ZONE || '';

    addMinutesToDate(minutes: number): NativeDate {
        return Moment.tz(this.timezone).add(minutes, 'minutes').toDate();
    }

    verifyExpirationDate(date: NativeDate): boolean {
        return Moment(date) > Moment.tz(this.timezone)  ? true : false;
    }

}