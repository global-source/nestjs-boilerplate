import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  Param,
  HttpStatus,
  Patch,
  Delete,
} from '@nestjs/common';

import { Response } from 'express';
import { UserService } from './user.service';
import { UserDTO, UpdateUserDTO } from 'src/common/dto/user.dto';
import { User } from 'src/common/entities/user.entity';
import { AppValidationPipe } from 'src/config/core/validationPipe';
import { AppException } from 'src/common/exception/App.exception';
import { Public } from 'src/common/decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(private tranService: UserService) {}

  /**
   * Fetch all User
   * @param res Response Body
   */
  @Get()
  async fetchAll(@Res() res: Response) {
    const user: User[] = await this.tranService.getAll();
    res.status(HttpStatus.OK).json({ body: user });
  }

  /**
   * To Create new user
   * @param res Response Body
   * @param userDTO User data to create [with Validation]
   */
  @Post()
  @Public()
  async new(
    @Res() res: Response,
    @Body(new AppValidationPipe()) userDTO: UserDTO,
  ) {
    try {
      const tr = await this.tranService.create(userDTO);
      res.status(HttpStatus.CREATED).json({ body: tr });
    } catch (err) {
      throw new AppException(err);
    }
  }

  /**
   * To Update the existing user
   * @param id Unique user identification
   * @param userDTO User data to update [with Validation]
   * @param res Response Body
   */
  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body(new AppValidationPipe()) userDTO: UpdateUserDTO,
    @Res() res: Response,
  ) {
    try {
      const tr = await this.tranService.update(id, userDTO);
      res.status(HttpStatus.OK).json({ body: tr });
    } catch (err) {
      throw new AppException(err);
    }
  }

  /**
   * To Delete the Transaction by ID
   * @param id Unique user identification
   * @param res Response Body
   */
  @Delete('/:id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    const tr = await this.tranService.delete(id);
    res.status(HttpStatus.OK).json({ body: tr });
  }
}
