/**
 * Created by fjc43 on 18/08/17.
 */
/**
 * Created by fjc43 on 18/08/17.
 */


const project_info = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "required": true
        },
        "subtitle": {
            "type": "string",
            "required": true
        },
        "description": {
            "type": "string",
            "required": true
        },
        "imageUri": {
            "type": "string",
            "required": true
        },
        "target": {
            "type": "number",
            "minimum" : 0,
            "required": true
        },
        "creators": {
            "type": "array",
            "required": true,
            "items" : {
                "type" : "object",
                "properties" : {
                    "name": {
                        "type": "string",
                        "required": true
                    }
                }
            },
            "uniqueItems" : true
        },
        "rewards": {
            "type": "array",
            "required": true,
            "items" : {
                "type" : "object",
                "properties" : {
                    "amount": {
                        "type": "number",
                        "minimum" : 0,
                        "required": true
                    },
                    "description": {
                        "type": "string",
                        "required": true
                    },

                }
            }
        }

    }
};
const giveDetails = {
    "type": "object",
    "required": true,
    "properties": {
        "amount": {
            "type": "number",
            "required": true,
            "minimum" : 0
        },
        "anonymous": {
            "type": "boolean",
            "required": true
        },
        "card": {
            "type": "object",
            "required": true,
            "properties" : {
                "authToken": {
                    "type": "string",
                    "required": true
                }
            }
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

const proID = {
    "type": "object",
    "required": true,
    "properties": {
        "proID": {
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

const updateOpenClose =
    {
        "type": "object",
        "required": true,
        "properties": {
            "open": {
                "type": "boolean",
                "required": true
            }
        }
    };


const rewardData =
    {
        "type": "object",
        "required": true,
        "properties": {
            "rewards": {
                "type": "array",
                "required": true,
                "items": {
                    "type": "object",
                    "properties": {
                        "amount": {
                            "type": "number",
                            "minimum": 0,
                            "required": true
                        },
                        "description": {
                            "type": "string",
                            "required": true
                        }

                    }
                }
            }
        }
    };


exports.project =
    {
        "type": "object",
        "properties": {
            "body" : project_info,
            "headers": user_xAuth,

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

exports.update =
    {
        "type": "object",
        "properties": {
            "headers" : user_xAuth,
            "body" : updateOpenClose,
            "params" : proID
        }
    };

exports.online =
    {
        "type": "object",
        "properties": {
            "headers": user_xAuth
        }

    };

exports.give = 
    {
        "type": "object",
        "properties": {
            "body": giveDetails,
            "params" : proID,
            "headers": user_xAuth
        }
    };

exports.image =
    {
        "type": "object",
        "properties": {
            "params" : proID,
            "headers": user_xAuth
        }
    };



exports.getProID =
    {
        "type": "object",
        "properties": {
            "params" : proID
        }
    };

exports.rewards =
    {
        "type": "object",
        "properties": {
            "headers": user_xAuth,
            "params": proID,
            "body": rewardData
        }
    };




