import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':pokemonId')
  create(
    @Param('pokemonId') pokemonId: number,
    @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(+pokemonId,createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

}
