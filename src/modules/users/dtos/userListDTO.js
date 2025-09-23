export default function userListDTO(user) {
  return {
    code: user.code,
    username: user.username,
    role: user.role,
    state: user.state,
    mail: user.mail,
    phone: user.phone,
  };
}
