// import argon2 from "argon2";

// Configure Argon2 options
// const hashingOptions = {
//   type: argon2.argon2id,
//   memoryCost: 19 * 1024, // 19 MiB
//   timeCost: 2,
//   parallelism: 1,
// };

// Get password from command line arguments
// const password = process.argv[2];

// if (!password) {
//   console.error("Usage: ts-node hashPasswordTool.ts <password>");
//   process.exit(1);
// }

// async function hashPassword() {
//   try {
//     const hashedPassword = await argon2.hash(password, hashingOptions);
//     console.log("Hashed password:\n", hashedPassword);
//   } catch (err) {
//     console.error("Error hashing password:", err);
//   }
// }

// hashPassword();
