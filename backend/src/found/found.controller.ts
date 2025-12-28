import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FoundService } from './found.service';
import { CreateFoundDto } from './dto/create-found.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('found')
export class FoundController {
  constructor(private foundService: FoundService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateFoundDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return this.foundService.create(dto, req.user, file);
  }

  @Get()
  findAll() {
    return this.foundService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foundService.findOne(+id);
  }
}