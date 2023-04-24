import { prop, getModelForClass, Ref } from "@typegoose/typegoose"
import { Subject } from "./subject";

class AcademicYearClass {
    @prop({ required: true })
    public title!: string;

    // @prop({ required: true, ref: () => Subject, type: () => [String] })
    // public subjects!: Ref<typeof Subject, string>;

    @prop()
    public year!: string;



}

export const AcademicYear = getModelForClass(AcademicYearClass);

