import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("DormInfo")
export class DormInfo {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"id"
        })
    id:number;
        

    @Column("integer",{ 
        nullable:true,
        name:"Broom"
        })
    Broom:number | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"Mop"
        })
    Mop:number | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"Trash"
        })
    Trash:number | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"Water"
        })
    Water:number | null;
        
}
