import { Controller } from '@nestjs/common';
import { OrmService } from '../../services/orm/orm.service';
import { FileService } from '../../services/file/file.service';
import { CreateDisheDto, UpdateDisheDto } from '../../dtos/dishe.dto';
import { DisheService } from '../../services/dishe/dishe.service';

@Controller('dishe')
export class DisheController {
    constructor(private disheService:DisheService) {
    }
  

}
