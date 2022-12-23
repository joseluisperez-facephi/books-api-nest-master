import { ApiProperty } from '@nestjs/swagger'; 

import { IsString, MinLength, IsOptional, IsDate, IsNumber, IsArray  } from "class-validator";


export class CreateBookDto {

    @ApiProperty({
        
        description: ' Nombre del libro',
        nullable: false,
        minLength: 1
    })

   @IsString()
   @MinLength(1)
    titulo: string;

   @IsString()
    isbn: string;

    @ApiProperty({
        
        description: ' Resumen del libro',
        nullable: true,
        minLength: 1
    })
    @IsString()
    @IsOptional()
    resumen?: string;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    fechadecreacion?: Date;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    fechadepublicacion?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    autor?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    editorial?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    urlPDF?: string;

    @ApiProperty()
    @IsString( { each: true} )
    @IsOptional()
    @IsArray()
    categoria?: string[];

    @ApiProperty()
    @IsString( { each: true} )
    @IsOptional()
    @IsArray()
    idioma?: string[];

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    valoracion?: number;
    
}
function IsOpcional() {
    throw new Error("Function not implemented.");
}

