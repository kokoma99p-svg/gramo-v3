import crypto from 'crypto';

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-admin-password -- your_password');
  process.exit(1);
}

const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(hash);
