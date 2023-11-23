
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);

	return bcrypt.hash(password, salt);
};

export default hashPassword;
