import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("VisitInfo")
export class VisitInfo {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"id"
        })
    id:number;
        

    @Column("integer",{ 
        nullable:true,
        name:"StudentId"
        })
    StudentId:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"DateTime"
        })
    DateTime:string | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"InOut"
        })
    InOut:number | null;
        

    @Column("text",{ 
        nullable:true,
        name:"StudentName"
        })
    StudentName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"Remarks"
        })
    Remarks:string | null;
        
}
