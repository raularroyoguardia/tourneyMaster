import { IJoc } from "./iJoc";

export interface IModeJoc {
    id:number;
    nom:string;
    descripcio:string;
    jugadors:number;
    joc_id: number; 
    joc: IJoc;
}