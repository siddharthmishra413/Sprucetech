exports.errorName = {
    intrnal_server_error: 'intrnal_server_error',

    duplicate_user_error: 'duplicate_user_error'
}


exports.errorType = {
    intrnal_server_error: { status: 500, message: 'Internal Server Error' },

    duplicate_user_error: { status: 400, message: 'User Already Exist' }
}