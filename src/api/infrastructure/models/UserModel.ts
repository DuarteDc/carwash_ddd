import { Schema,model } from 'mongoose';
import { UserEntity } from '../../domain/user/UserEntity';


const UserSchema = new Schema<UserEntity>({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
},{
    timestamps: true,
    versionKey: false,
});

UserSchema.method('toJSON', function () {
    const { password, ...user } = this.toObject();
    return user;
});

// UserSchema.plugin(mongoosePaginate);

const UserModel = model('User', UserSchema);

export default UserModel;