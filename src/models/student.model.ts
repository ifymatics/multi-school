import { getModelForClass, prop, Ref, types } from "@typegoose/typegoose";
import { AcademicClass } from "./academic-class.model"
import { Schema } from "mongoose";
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
    @prop({ required: true, ref: () => AcademicClass, type: () => Schema.Types.ObjectId })
    public class?: Ref<typeof AcademicClass>;
}
export const Student = getModelForClass(StudentClass)