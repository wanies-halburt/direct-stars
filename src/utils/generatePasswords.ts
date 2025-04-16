function generatePassword(length = 12, options = {
    uppercase: true,
    numbers: true,
    specialChars: true,
  }) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
    let chars = lowercase;
    if (options.uppercase) chars += uppercase;
    if (options.numbers) chars += numbers;
    if (options.specialChars) chars += specialChars;
  
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return password;
  }

  export default generatePassword;