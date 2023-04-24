import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { AcademicYear } from "./academic-year.model";
import { Schema } from "mongoose";

class AcademicClassModel {
    @prop({ required: true })
    name!: string;
    @prop({ required: true, ref: () => AcademicYear, type: () => Schema.Types.ObjectId })
    academicYear!: Ref<typeof AcademicYear>;
}
export const AcademicClass = getModelForClass(AcademicClassModel);