import { IsString, MinLength, IsOptional, IsDate, IsNumber, IsArray  } from "class-validator";


export class CreateBookDto {

   @IsString()
   @MinLength(1)
    titulo: string;

   @IsString()
    isbn: string;

    @IsString()
    @IsOptional()
    resumen?: string;

    @IsDate()
    @IsOptional()
    fechadecreacion?: Date;

    @IsDate()
    @IsOptional()
    fechadepublicacion?: Date;

    @IsString()
    @IsOptional()
    autor?: string;

    @IsString()
    @IsOptional()
    editorial?: string;

    @IsString()
    @IsOptional()
    urlPDF?: string;

    @IsString( { each: true} )
    @IsOptional()
    @IsArray()
    categoria?: string[];

    @IsString( { each: true} )
    @IsOptional()
    @IsArray()
    idioma?: string[];

    @IsNumber()
    @IsOptional()
    valoracion?: number;
    
}
function IsOpcional() {
    throw new Error("Function not implemented.");
}

