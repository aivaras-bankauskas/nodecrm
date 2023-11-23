import mongoose from 'mongoose';
import hashPassword from '../../utils/helpers/passwordHashing';
import UserInterface from '../../interfaces/UserInterface';

const userSchema = new mongoose.Schema<UserInterface>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.pre('save', async function() {
	if (this.isModified('email')) {
		this.email = this.email.toLowerCase();
	}

	if (this.isModified('password')) {
		this.password = await hashPassword(this.password);
	}
});

const User = mongoose.model<UserInterface>('User', userSchema);

export default User;
