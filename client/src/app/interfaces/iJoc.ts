import { IModeJoc } from "./iModeJoc";

export interface IJoc{
    id:number;
    nom:string;
    categoria:string;
    plataforma:string;
    foto:string | null;
    mode_jocs?: IModeJoc[];
}