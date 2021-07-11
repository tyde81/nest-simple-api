import { IsLowercase, IsString, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @Length(0, 40, {
        message: "Invalid name."
    })
    name: string;


    @Column()
    @IsString()
    @IsLowercase()
    @Length(3, 15, {
        message: "Invalid username."
    })
    username: string;

    @Column()
    @Length(6, 30, {
        message: "Invalid password."
    })
    password: string;

    @Column()
    @Generated("uuid")
    uuid: string;
}
