import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("StudentInfo")
export class StudentInfo {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"id"
        })
    id:number;
        

    @Column("text",{ 
        nullable:true,
        name:"Name"
        })
    Name:string | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"StudentId"
        })
    StudentId:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Class"
        })
    Class:string | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"DormId"
        })
    DormId:number | null;
        
}
