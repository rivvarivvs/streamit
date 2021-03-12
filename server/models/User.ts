import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import nanoid from 'nanoid'

// An interface that describes the properties
// that are requried to create a new User
interface UserAttrs {
    username: string;
    email: string;
    password: string;
    stream_key: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}
  
// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    stream_key: string;
}


const userSchema = new mongoose.Schema ({
    username: String,
    email: String,
    password: String,
    stream_key: String
})

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password)
// }

userSchema.methods.generateStreamKey = () => {
    return nanoid()
}

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, any>("User", userSchema)

export { User }