export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

    // Potential domain logic methods can go here
    // For example:
    // updateEmail(newEmail: string): void {
    //     // Add validation or business rules if needed
    //     this.email = newEmail;
    //     this.updatedAt = new Date();
    // }
} 