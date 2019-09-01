
export interface User{
    "_id": string,
    "name": string,
    "email": string,
    "password": string,
    "birthday": string,
    "imageUrl": string,
}

export interface loginUserData{
    "_id": string,
    "name": string,
    "email": string,
}

/*          const user : User = {
            "_id": obj.id,
            "name": obj.name,
            "email": obj.email,
            "password": "beebz1997",
            "birthday": obj.birthday,
            "imageUrl": obj.picture.data.url,
        };*/