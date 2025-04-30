import { IUser } from "./iUser";

export interface IEquip{
    id:number;
    nom:string;
    regio:string;
    foto_equip:string | null;
    trofeus:number;
    data_creacio:Date;
    descripcio:string;
    maxim_integrants:number;
    jugadors: IUser[];
}