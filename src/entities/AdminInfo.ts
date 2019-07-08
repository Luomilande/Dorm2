import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("AdminInfo")
export class AdminInfo {

    @PrimaryGeneratedColumn({
        type: "integer",
        name: "id"
    })
    id: number;


    @Column("text", {
        nullable: true,
        name: "Name"
    })
    Name: string | null;


    @Column("integer", {
        nullable: true,
        name: "JobNumber"
    })
    JobNumber: number | null;


    @Column("integer", {
        nullable: true,
        name: "PhoneNumber"
    })
    PhoneNumber: number | null;

    @Column("text", {
        nullable: true,
        name: "Account"
    })
    Account: string | null;


    @Column("text", {
        nullable: true,
        name: "Password"
    })
    Password: string | null;

    @Column("text", {
        nullable: true,
        name: "Remarks"
    })
    Remarks: string | null;
}
