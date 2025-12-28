import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, UploadedFile, Param, Patch } from '@nestjs/common';
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

  // ✅ YE ROUTE ADD KIYA HAI: Profile page ke liye
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.foundService.findByUserId(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foundService.findOne(+id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.foundService.updateStatus(+id, status);
  }
}