import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ParseIntPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  findAll(@Req() req) {
    //console.log(req.user);
    return this.userService.findAll();
  }
  @Delete(':id')
  @UsePipes(new ParseIntPipe())
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN_ROLE))
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    console.log(req.user);
    return this.userService.remove(id);
  }
}
