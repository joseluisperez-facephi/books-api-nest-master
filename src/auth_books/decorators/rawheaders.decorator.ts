import { createParamDecorator, InternalServerErrorException, ExecutionContext } from '@nestjs/common';


export const RawHeaders = createParamDecorator(
( data: string, ctx: ExecutionContext ) => {

    const req = ctx.switchToHttp().getRequest();
    const rawHeaders = req.rawHeaders;
    

 
    if ( !rawHeaders )
        throw new InternalServerErrorException(' Usuario no encontrado ( request )');

        return (!data) 
        ? rawHeaders
        : rawHeaders[data];
}


);