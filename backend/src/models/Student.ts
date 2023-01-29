import { Schema, model } from "mongoose";
import { Users } from "../types/PersonaTypes";
import bcrypt from "bcrypt";

const StudensSchema = new Schema<Users>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
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
    email: {
      type: String,
      required: true,
      unique:true
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

StudensSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudensSchema.pre("findOneAndUpdate", async function (next) {
  // obtener el objeto de actualización
  const update:any = this.getUpdate();

  // verificar si el campo "password" está presente en el objeto de actualización
  if (update?.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password,salt);
  }

  next();
});

StudensSchema.methods.comparePassword = async function (
  passwordForm: string | Buffer
) {
  return await bcrypt.compare(passwordForm, this.password);
};

const studensModel = model("studen", StudensSchema);

export default studensModel;
