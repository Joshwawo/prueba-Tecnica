import {Schema, model} from 'mongoose'
import {Users} from '../types/PersonaTypes'

const teacherSchema = new Schema<Users>(
  {
    name:{
      type:String,
      required:true
    },
    lastName:{
      type:String,
      required:true
    },
    userName:{
      type: String,
      required:true
    },
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    sex:{
      type:String,
      required:true
    },
    dateBirth:{
      type:Date,
      required:true,
      default: Date.now()
    },
    isAdmin:{
      type:Boolean,
      required:true,
      default:false
    }
  },

  {})