export default function userContextDTO(user) {
  return {
    code: user.code,
    username: user.username,
    role: user.role,
    mail: user.mail,
    phone: user.phone,
  };
}
