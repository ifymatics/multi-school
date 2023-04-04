import { getModelForClass, prop } from "@typegoose/typegoose";

class UserClass {
    @prop({ required: true })
    firstName!: string;
    @prop({ required: true })
    lastName!: string;
    @prop({ required: true, unique: true })
    email!: string;
    @prop({ required: true })
    password!: string;
    @prop({ required: true })
    role!: 0 | 1 | 2;

}
export const User = getModelForClass(UserClass)