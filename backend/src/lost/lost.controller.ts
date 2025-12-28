import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { LostService } from './lost.service';
import { CreateLostDto } from './dto/create-lost.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('lost')
export class LostController {
  constructor(private lostService: LostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Is folder mein file jayegi
        filename: (req, file, callback) => {
          // Unique name banana extension ke sath
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateLostDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    // Ab 'file.filename' mein pura naam hoga (e.g. 123456.jpg)
    return this.lostService.create(dto, req.user, file);
  }

  @Get()
  findAll() {
    return this.lostService.findAll();
  }

  // Details page ke liye ye bhi add kar len agar nahi hai
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lostService.findOne(+id);
  }
}