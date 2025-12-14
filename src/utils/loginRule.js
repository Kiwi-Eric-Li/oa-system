export const loginRule = {
    userRule: [
        {required: true, message: "用户名不能为空"},
        {max: 16, message: "用户名长度不正确"},
        {min: 4, message: "用户名长度不正确"}
    ],
    passwordRule: [
        {required: true, message: "密码不能为空"},
        {max: 16, message: "密码长度不正确"},
        {min: 4, message: "密码长度不正确"}
    ]
}