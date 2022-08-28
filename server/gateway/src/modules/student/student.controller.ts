import { ICreateStudentRequest } from './student.type';
import Student, { StudentModel } from './student.model';
import { ProtectedRequest } from 'app-request';

export default class StudentController {
    public static async create(req: ProtectedRequest, info: ICreateStudentRequest): Promise<Student> {
        const { userId } = info;

        const student = await StudentModel.create({
            user: userId
        })

        return student;
    }
}
