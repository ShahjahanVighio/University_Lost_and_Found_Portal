import { Controller, Post, Body, Get, UseGuards, Req, UseInterceptors, UploadedFile, Param, Patch } from '@nestjs/common';
import { LostService } from './lost.service';
import { CreateLostDto } from './dto/create-lost.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('lost')
export class LostController {
  constructor(private lostService: LostService) {}

  // 1. Create Lost Item with Image Upload
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
    @Body() dto: CreateLostDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    return this.lostService.create(dto, req.user, file);
  }

  // 2. Get All Items (Home Page)
  @Get()
  findAll() {
    return this.lostService.findAll();
  }

  // 3. Get User Specific Items (Profile Page ke liye zaroori)
  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    return this.lostService.findByUserId(+userId);
  }

  // 4. Get Single Item Details
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lostService.findOne(+id);
  }

  // 5. Update Status (Recovered/Resolved)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.lostService.updateStatus(+id, status);
  }
}