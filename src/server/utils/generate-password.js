import randomstring from 'randomstring';

const generatePassword = () => randomstring.generate(8);

export { generatePassword };
