import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { AcademicClass } from "./class.model"
class StudentClass {
    @prop({ required: true })
    public fullName!: string

    @prop({ unique: true })
    public email?: string;

    @prop({ required: true })
    public regNo!: string;
    @prop({ required: true })
    public nameOfGuardian!: string;
    @prop()
    public phoneOfGuardian?: string;
    @prop({ required: true, unique: true })
    public emailOfGuardian?: string;
    @prop()
    public profilePic?: string;
    @prop()
    public dateOfBirth!: string;
    @prop()
    public class?: Ref<typeof AcademicClass>;
}
const Student = getModelForClass(StudentClass)