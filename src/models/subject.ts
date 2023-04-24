import { prop, getModelForClass, Ref } from "@typegoose/typegoose"
import { Schema } from "mongoose";
import { AcademicClass, AcademicYear } from "./";

class SubjectClass {
    @prop({ required: true })
    public name!: string

    @prop({ required: true, ref: () => AcademicClass, type: () => Schema.Types.ObjectId })
    public academicClass!: Ref<typeof AcademicClass>

    @prop({ required: true, ref: () => AcademicYear, type: () => Schema.Types.ObjectId })
    public academicYear!: Ref<typeof AcademicYear>
    @prop()
    public creditLoad!: string;


}

export const Subject = getModelForClass(SubjectClass);
// export { School }
