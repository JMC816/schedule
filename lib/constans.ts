export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).+$/
);

export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자, 대문자와 특수 문자가 있어야 합니다.";
