import { IJoc } from "./iJoc";
import { IMapa } from "./iMapa";

export interface IModeJoc {
    id:number;
    nom:string;
    descripcio:string;
    jugadors:number;
    joc_id: number; 
    joc: IJoc;
    mapas?: IMapa[];
}