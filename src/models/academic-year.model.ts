import { prop, getModelForClass } from "@typegoose/typegoose"

class AcademicYearClass {
    @prop({ required: true })
    public title!: string;

    @prop({ required: true })
    public subject?: string;
    @prop()
    public year!: string;



}

export const AcademicYear = getModelForClass(AcademicYearClass);

