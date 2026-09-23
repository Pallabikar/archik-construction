import jwt from 'jsonwebtoken';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Please define the JWT_SECRET environment variable');
  }
  return secret;
}

export function generateToken(payload) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function extractTokenFromHeaders(headers) {
  // Handle both Headers object and plain object
  let authHeader;
  if (headers.get && typeof headers.get === 'function') {
    authHeader = headers.get('authorization') || headers.get('Authorization');
  } else if (headers.authorization) {
    authHeader = headers.authorization;
  } else if (headers.Authorization) {
    authHeader = headers.Authorization;
  }
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
}

export function extractTokenFromCookies(cookies) {
  return cookies.token || null;
}