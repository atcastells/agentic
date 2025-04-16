export class UserDto {
    id!: string;
    name!: string;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;

    // Optionally add a static factory method for conversion
    // static fromEntity(user: User): UserDto {
    //     const dto = new UserDto();
    //     dto.id = user.id;
    //     dto.name = user.name;
    //     dto.email = user.email;
    //     dto.createdAt = user.createdAt;
    //     dto.updatedAt = user.updatedAt;
    //     return dto;
    // }
} 