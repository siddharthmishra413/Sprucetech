exports.errorName = {
  intrnal_server_error: "intrnal_server_error",

  duplicate_user_error: "duplicate_user_error",

  user_doesnt_exist: "user_doesnt_exist",

  user_unauthorized: "user_unauthorized",

  token_expired: "token_expired",

  duplicate_role: "duplicate_role"
};

exports.errorType = {
  intrnal_server_error: { status: 500, message: "Internal Server Error" },

  duplicate_user_error: { status: 400, message: "User Already Exist" },

  user_doesnt_exist: { status: 404, message: "User Does Not Exist" },

  user_unauthorized: { status: 401, message: "User Not Authorized" },

  token_expired: { status: 400, message: "Reset Token Expired" },

  duplicate_role: { status: 400, message: "Role Already Exits" }
};
