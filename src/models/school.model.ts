import { prop, getModelForClass } from "@typegoose/typegoose"
import { EnumType } from "typescript";
class SchoolClass {
    @prop({ required: true })
    public name!: string

    @prop({ required: true, unique: true })
    public email!: string;
    @prop()
    public phone?: string;
    @prop({ required: true })
    public regNo!: string;
    @prop({ required: true })
    public contactPerson!: string;
    @prop({ default: false })
    public status!: boolean | 'approved' | "rejected";

}

export const School = getModelForClass(SchoolClass);
// export { School }
