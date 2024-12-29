import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const getTokenValue = async() => {
  try {
    const cookieStore =  await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      throw new Error('Token not found in cookies');
    }

    // Decode the token using the secret key
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    return decodedData;
  } catch (error) {
    throw new Error(error.message);
  }
}
