import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
});

const User = mongoose.model<UserInterface>('User', userSchema);

export default User;
