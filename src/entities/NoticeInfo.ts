import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("NoticeInfo")
export class NoticeInfo {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"id"
        })
    id:number;
        

    @Column("text",{ 
        nullable:true,
        name:"Notice"
        })
    Notice:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"DateTime"
        })
    DateTime:string | null;
        
    @Column("text",{ 
        nullable:true,
        name:"Name"
        })
    Name:string | null;

    @Column("text",{ 
        nullable:true,
        name:"Title"
        })
    Title:string | null;
        
}
