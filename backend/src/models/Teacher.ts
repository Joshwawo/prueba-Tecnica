import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { Users } from "../types/PersonaTypes";

const TeacherSchema = new Schema<Users>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique:true
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    dateBirth: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

TeacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

TeacherSchema.pre("findOneAndUpdate", async function (next) {
  // obtener el objeto de actualización
  const update:any = this.getUpdate();

  // verificar si el campo "password" está presente en el objeto de actualización
  if (update?.password) {
    // encriptar la password antes de continuar con la actualización
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password,salt);
  }

  next();
});

TeacherSchema.methods.comparePassword = async function (
  passwordForm: string | Buffer
) {
  return await bcrypt.compare(passwordForm, this.password);
};


const TeacherModel = model("teacher", TeacherSchema);
export default TeacherModel;
