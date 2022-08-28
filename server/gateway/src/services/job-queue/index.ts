import { CONFIG_ENV_JOB_QUEUE_URL } from './../../configs/env';
import { BadRequestError } from './../../core/api-error';
import axios from 'axios';
// import User from '../../models/user.model';
// import Unit from '../../models/unit';
// import Course from '../../models/course';
import { ENUM_EMAIL_TEMPLATE } from '../../const/email';

export interface IMailTeacherLateToClass {
    student_name: string;
    teacher_name: string;
    start_time: number;
    teacher_skype: string;
    student_skype: string;
}

export interface IMailRelatedToBooking {
    student_name: string;
    teacher_name: string;
    course_name: string;
    unit_name: string;
    start_time: number;
    teacher_avatar: string;
    join_url: string;
    course_preview: string;
    teacher_skype: string;
    student_skype: string;
}

export interface IMailRequestReviewToAdmin {
    email: string;
    first_name: string;
    last_name: string;
    gender: any;
    phone_number: string;
    date_of_birth: string;
}

export interface IMailUpdateStatusBooking {
    student_name: string;
    teacher_name: string;
    old_status: string;
    new_status: string;
    start_time: number;
    teacher_skype: string;
    student_skype: string;
    booking_id: number;
}

export interface IMailNewAdminAccount {
    name: string;
    username: string;
    password: string;
}

export default class JobQueueServices {
    /*
     * Summary: make request to send mail in Email services
     * Params:
     * template: string / loai email muon gui
     * to: dia chi nguoi nhan
     * name: ten nguoi nhan
     * url: (neu co) link de verify mail hoac reset mat khau
     */
    public static async sendMailWithUrl(
        template: ENUM_EMAIL_TEMPLATE,
        to: string,
        name: string,
        url?: string
    ) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
            await axios({
                method: 'post',
                url: route,
                data: {
                    template,
                    to,
                    name,
                    url
                }
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    /*
     * @description make request to send mail in Email services related to booking
     * @param {string} template - email template to send
     * @param {string} to - received email
     * @param {string} student_name - name of the student booked the lesson
     * @param {string} teacher_name - name of the teacher that will teach the lesson
     * @param {string} course_name - name of the course
     * @param {string} unit_name - name of the unit that will be taught
     * @param {number} status - new status of the booking
     * @param {string} communicate_tool - communicate account of the teacher used for the lesson
     * @return Success or BadRequestError from email worker service
     */
    public static async sendMailRelatedToBooking(
        template: ENUM_EMAIL_TEMPLATE,
        to: string,
        payload: IMailRelatedToBooking
    ) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
            await axios({
                method: 'post',
                url: route,
                data: {
                    template,
                    to,
                    ...payload
                }
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    public static async sendMailRequestReviewToAdmin(
        template: ENUM_EMAIL_TEMPLATE,
        to: string,
        payload: IMailRequestReviewToAdmin
    ) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
            await axios({
                method: 'post',
                url: route,
                data: {
                    template,
                    to,
                    ...payload
                }
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    // public static async sendMailLessonTeachingOverTime(
    //     template: ENUM_EMAIL_TEMPLATE,
    //     to: string,
    //     teacher: User,
    //     student: User,
    //     course: Course,
    //     unit: Unit
    // ) {
    //     try {
    //         const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
    //         await axios({
    //             method: 'post',
    //             url: route,
    //             data: {
    //                 template,
    //                 to,
    //                 teacher,
    //                 student,
    //                 course,
    //                 unit
    //             }
    //         });
    //     } catch (err: any) {
    //         throw new BadRequestError(err.message);
    //     }
    // }

    public static async sendMailTeacherLateToClass(
        template: ENUM_EMAIL_TEMPLATE,
        to: string,
        payload: IMailTeacherLateToClass
    ) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
            await axios({
                method: 'post',
                url: route,
                data: {
                    template,
                    to,
                    ...payload
                }
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    public static async sendMailUpdateStatusBooking(
        template: ENUM_EMAIL_TEMPLATE,
        to: string,
        payload: IMailUpdateStatusBooking
    ) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
            await axios({
                method: 'post',
                url: route,
                data: {
                    template,
                    to,
                    ...payload
                }
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    public static async sendMailNewAdminAccount(
        template: ENUM_EMAIL_TEMPLATE,
        to: string,
        payload: IMailNewAdminAccount
    ) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
            await axios({
                method: 'post',
                url: route,
                data: {
                    template,
                    to,
                    ...payload
                }
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    public static async sendMailWithTemplate(data: {
        to: string;
        subject: string;
        body: string;
        data: any;
    }) {
        // Disable send mail because affect the system Ispeak
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email/template`;
            await axios({
                method: 'post',
                url: route,
                data: data
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    public static async sendUnicastMail(data: {
        to: string;
        subject: string;
        body: string;
    }) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email`;
            await axios({
                method: 'post',
                url: route,
                data: data
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }

    public static async sendMultticastMail(data: {
        to: string[];
        subject: string;
        body: string;
    }) {
        try {
            const route = `${CONFIG_ENV_JOB_QUEUE_URL}/email/multiple`;
            await axios({
                method: 'post',
                url: route,
                data: data
            });
        } catch (err: any) {
            throw new BadRequestError(err.message);
        }
    }
}
