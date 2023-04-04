import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { AcademicYear } from "./academic-year.model";

class AcademicClassModel {
    @prop({ required: true })
    name!: string;
    @prop({ required: true })
    academicYear!: Ref<typeof AcademicYear>;
}
export const AcademicClass = getModelForClass(AcademicClassModel);