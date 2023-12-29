"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        //^username
        username: zod_1.z.string({
            required_error: 'Username is required'
        }).trim(),
        //^email
        email: zod_1.z.string({
            required_error: 'Email is required'
        }).email({
            message: 'Invalid email address'
        }).trim(),
        //^password
        password: zod_1.z.string({
            required_error: 'Password is required'
        }).refine(value => {
            const uppercaseRegex = /(?=.*[A-Z])/;
            const isMatch = uppercaseRegex.test(value);
            return isMatch;
        }, {
            message: `Password must be contained at least one capital alphabet.`
        }).refine(value => {
            const lowercaseRegex = /(?=.*[a-z].*[a-z].*[a-z])/;
            const isMatch = lowercaseRegex.test(value);
            return isMatch;
        }, {
            message: `Password must be contained at least tree smaller alphabet.`
        }).refine(value => {
            const specialCharacterRegex = /(?=.*[!@#$&*])/;
            const isMatch = specialCharacterRegex.test(value);
            return isMatch;
        }, {
            message: `Password must be contained at least one of these characters [!@#$&*].`
        }).refine(value => {
            const digitsRegex = /(?=.*[0-9].*[0-9])/;
            const isMatch = digitsRegex.test(value);
            return isMatch;
        }, {
            message: `Password must be contained at least two digits.`
        }).refine(value => {
            const passwordLength = value.length >= 8;
            return passwordLength;
        }, {
            message: `Password must be at least eight characters long.`
        }),
        //^role
        role: zod_1.z.enum(['user', 'admin']).default('user').optional(),
    })
});
const userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        //^username
        username: zod_1.z.string({
            required_error: 'Username is required'
        }).trim(),
        //^password
        password: zod_1.z.string({
            required_error: 'Password is required'
        })
    })
});
const changePasswordValidationSchema = zod_1.z.object({ body: zod_1.z.object({
        currentPassword: zod_1.z.string(),
        newPassword: zod_1.z.string()
    }) });
const authValidationSchema = {
    userValidationSchema,
    userLoginValidationSchema,
    changePasswordValidationSchema
};
exports.default = authValidationSchema;
