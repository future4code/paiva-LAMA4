export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string, 
        private role: USER_ROLES
    ) {}

    getId():string {
        return this.id;
    };

    getName():string {
        return this.name;
    };

    getEmail():string {
        return this.email;
    };

    getPassword():string {
        return this.password;
    };

    getRole(): USER_ROLES {
        return this.role
    }

    setId(newId: string):void {
        this.id = newId;
    };

    setName(newName: string):void {
        this.name = newName;
    };

    setEmail(newEmail: string):void {
        this.email = newEmail;
    };

    setPassword(newPassword: string):void {
        this.password = newPassword;
    };

    static toUserModel(data: any):User {
        return new User(data.id, data.name, data.email, data.password, data.role);
    };
};