/**
 * Created by fjc43 on 18/08/17.
 */


const user_info = {
    "type": "object",
        "properties": {
        "user": {
            "type": "object",
                "properties": {
                "username": {
                    "type": "string",
                        "required": true
                },
                "location": {
                    "type": "string",
                        "required": true
                },
                "email": {
                    "type": "string",
                        "required": true
                }
            },
            "required": true
        },
        "password": {
            "type": "string",
                "required": true
        }
    }
};

const user_xAuth =
    {
    "type": "object",
    "required": true,
    "properties": {
        "x-authorization": {
            "type": "string",
            "required": true
        }
    }
};

const user_id = {
    "type": "object",
    "required": true,
    "properties": {
        "userID": {
            "type": "string",
            "required": true
        }
    }
};

const loginCreds =
    {
        "type": "object",
        "required": true,
        "properties": {
            "username": {
                "type": "string",
                "required": true
            },
            "password": {
                "type": "string",
                "required": true
            }
        }
    };

exports.user =
    {
        "type": "object",
        "properties":
            {"body" : user_info}

    };

exports.update =
    {
        "type": "object",
        "properties": {
            "body" : user_info,
            "headers": user_xAuth,
            "params" : user_id

        }

    };

exports.onlineUser =
    {
        "type": "object",
        "properties": {
            "headers": user_xAuth,
            "params" : user_id
        }

    };

exports.login =
    {
        "type": "object",
        "properties": {
            "query" : loginCreds
        }
    };

exports.online =
    {
        "type": "object",
        "properties": {
            "headers": user_xAuth
        }

    };