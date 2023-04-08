import Generator from 'generate-password';

export const generateRandomCode = () => Generator.generate({
    length      : 4,
    numbers     : true,
    lowercase   : false,
    uppercase   : false
})